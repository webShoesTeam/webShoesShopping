const userService = require('../user/userService');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const passport = require('../../passport');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');

const {CLIENT_URL} = process.env;

exports.login = (req, res) => {
    //res.render('auth/view/login');
    const wrongPassword = req.query['wrong-password'] !== undefined;
    console.log("req.user\n\n" + JSON.stringify(req.user));
    res.render('login', {
        title: "Login",
        wrongPassword,
        user: req.user,
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

exports.getRegister = (req, res) => {
    res.render('register', {
        title: 'Register',
    })
};

exports.postRegister = async (req, res) => {
    console.log("into post register");
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
                console.log(newUser);

                const activation_token = createActivationToken(newUser);

                const url = `${CLIENT_URL}/user/activate/${activation_token}`
                sendMail(email, url, "Verify your email address")

                res.json({ msg: "Register Success! Please activate ur email to start." });
            } catch (err) {
                return res.status(500).json({ msg: err.message })
            }
        }
    }
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