const userService = require('../user/userService');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const passport = require('../../passport');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');
const userModel = require('../../models/userModel');


const {CLIENT_URL} = process.env;

exports.login = (req, res) => {
    //res.render('auth/view/login');
    var flag = 0;
    if(req.query.success != undefined && req.query.success == 1){
        var flag = 1;
    }
    const wrongPassword = req.query['wrong-password'] !== undefined;
    console.log("req.user\n\n" + JSON.stringify(req.user));
    res.render('login', {
        title: "Login",
        wrongPassword,
        user: req.user,
        flag: flag,
    });
};

exports.forget = (req, res) => {
    res.render('forgetPassword', {
        title: "forgetPassword",
    });
};

exports.postLogin = function (req, res, next) {
    console.log("\n\n\n\nreq: \n" + JSON.stringify(req.query));
    var prev = req.query.redirect;

    console.log("redirect: " + prev);
    if (typeof prev === 'undefined') {
        prev = '/'
    } else {
        prev = '/' + prev;
    }
    passport.authenticate('local', {
        successRedirect: prev,
        failureRedirect: '/login?username or password is wrong',
    })(req, res, next);
};

exports.getLogout = (req, res) => {
    req.logout();    
    //req.flash('success', 'You are logged out!');
    res.redirect('/');
};

exports.getRegister = async(req, res) => {
    res.render('register', {
        title: 'Register',
    })
};

exports.postRegister = async (req, res) => {
    const name = await req.body.name;
    const email = await req.body.email;
    const phone = await req.body.phone;
    const username = await req.body.username;
    const password = await req.body.password;
    const password2 = await req.body.password2;
    const address = await req.body.address;

    if (password !== password2) {
        console.log("Password do not match");
        res.render('register', {
            title: "Register",
        });
        return;
    }
    check('name', 'Name is required!').notEmpty();
    check('email', 'Email is required!').isEmail();
    check('phone', 'Email is required!').notEmpty();
    check('address', 'Email is required!').notEmpty();
    check('username', 'Username is required!').notEmpty();
    check('password', 'Password is required!').notEmpty();
    // check('password2', 'Passwords do not match!').equals(password);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("loi empty validation");
        res.render('register', {
            errors: errors,
            title: 'Register',
        });
    }
    else {
        const usernameFound = await userService.findByUsername(username);
        // console.log("into create register");
        const emailFound = await userService.findByEmail(email);

        if (usernameFound || emailFound) {
            console.log("Found\n" + JSON.stringify(usernameFound));
            console.log("Found\n" + JSON.stringify(emailFound));
            res.render('register', {
                title: "Register",
                errors: "Username or email existed",
            });
        }
        else {
            // const user = userService.createUser(name, email, phone, address, username, password);

            // console.log("user: " + user);
            // res.redirect('/login');
            try {
                const passwordHash = await bcrypt.hash(password, 10);

                const newUser = {
                    name, email, phone, username, password: passwordHash, address
                }
                const activation_token = createActivationToken(newUser);

                const url = `${CLIENT_URL}/activation/${activation_token}`
                sendMail(email, url, "Verify your email address")

                res.json({ msg: "Register Success! Please activate ur email to start." });
            } catch (err) {
                return res.status(500).json({ msg: err.message })
            }
        }
    }
}

exports.activateEmail = async (req, res) => {
    try {
        const activation_token = req.params.token
        const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

        console.log(user);
        const {name, email, phone, address, username, password} = user

        const check = await userService.findByEmail(email);
        if(check) {
            return res.status(400).json({msg: "This email already existed!"})
        }
        
        // const userNew = await userService.createUser(name, email, phone, address, username, password);
        // res.redirect('/login');
        const newUser = new userModel({
            name, email, username, password, phone, address
        })

        await newUser.save()

        console.log("Account has been activated!")
        // res.json({msg: "Account has been activated!"})
        res.redirect("/login?success=1")

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

exports.postForget = async (req, res) => {
    try {
        const email  = await req.body.email;

        const user = await userService.findByEmail(email);
        if (!user) return res.status(400).json({ msg: "This email does not exist." })

        const access_token = createAccessToken(user);
        const url = `${CLIENT_URL}/reset/${access_token}`

        sendMail(email, url, "Reset your password")
        res.json({ msg: "Reset the password, please check your email." })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const access_token = req.params.token;

        const user = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);

        // res.json({msg: "Reset password success!"})
        const url = `${CLIENT_URL}/changePassword/${user._id}`;
        res.redirect(url);

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

exports.changePassword = async (req, res) => {
    res.render('changePassword', {
        title: 'changePassword',
        userID: req.params.id
    })
}

exports.change = async (req, res) => {
    const password = await req.body.password;
    const password2 = await req.body.password2;

    if (password !== password2) {
        console.log("Password do not match");
        res.render('changePassword', {
            title: "changePassword",
        });
        return;
    }

    await userService.updatePassword(req.params.id, password);
    res.redirect("/login");
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}