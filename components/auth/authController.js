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
    let mess = req.query.mess !== undefined;
    // console.log("req.user\n\n" + JSON.stringify(req.user));
    if (mess) {
        mess = req.query.mess;
    }
    let success = req.query['success'] !== undefined;
    if (success) {
        success = req.query.success;
    }
  
    res.render('authentication/login', {
        title: "Login",
        success: success,
        mess: mess,
    });
};

exports.forget = (req, res) => {
    let mess = req.query.mess !== undefined;
    if (mess) {
        mess = req.query.mess;
    }
    res.render('authentication/forgetPassword', {
        title: "forgetPassword",
        //flag: req.query.flag
        mess: mess,
    });
};

exports.postLogin = function (req, res, next) {

    var prev = req.query.redirect;
    console.log("redirect: " + prev);
    if (typeof prev === 'undefined') {
        prev = '/'
    } else {
        prev = '/' + prev;
    }
    // console.log("redirect: " + prev);
    passport.authenticate('local', {
        // successRedirect: '/',
        successRedirect: prev,
        failureRedirect: '/login?mess=username or password is wrong',
        // failureFlash: true
    })(req, res, next);


    // passport.authenticate('local', {
    //     // successRedirect: "/?fl=1",
    //     // failureRedirect: `/login?success=3&username=${req.body.username}`,
    //     successRedirect: "/",
    //     failureRedirect: `/login?mess=username or password is incorrect`,
    // })(req, res, next);
};

exports.getLogout = (req, res) => {
    req.logout();
    //res.redirect('/?fl=2');
    res.redirect('/');
};

exports.getRegister = async(req, res) => {
    let mess = req.query['error'] !== undefined;
    if (mess) {
        mess = req.query.error;
    }
    let success = req.query['success'] !== undefined;
    if (success) {
        success = req.query.success;
    }
    res.render('authentication/register', {
        title: 'Register',
        mess: mess,
        success: success,

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

    if (name == "" || email == "" || username == "" || password == "" || password2 == "" || address == "" || phone == "") {
        res.redirect('/register?mess=Please enter full information')
    } 
    else {
        if (password !== password2) {
            res.redirect('/register?error=confirm password is wrong')
        }
        else {
                const usernameFound = await userService.findByUsername(username);
                const emailFound = await userService.findByEmail(email);

                if (usernameFound) {
                    res.redirect("/register?error=Username existed")
                }
                else if (emailFound) {
                    res.redirect("/register?error=email existed")
                }
                else {
                    try {
                        const passwordHash = await bcrypt.hash(password, 10);
                        const newUser = {
                            name, email, phone, username, password: passwordHash, address
                        }
                        const activation_token = createActivationToken(newUser);
                        const url = `${CLIENT_URL}/activation/${activation_token}`
                        sendMail(email, url, "Verify your email address")
                        res.redirect("/register?success=Register Success! Please activate ur email to start.")
 
                    } catch (err) {
                        //return res.status(500).json({ msg: err.message })
                        res.redirect("/register?error=Something wrong, please try again")
                    }
                }
        }
    }
}

exports.activateEmail = async (req, res) => {
    try {
        const activation_token = req.params.token
        const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

        // console.log(user);
        const {name, email, phone, address, username, password} = user

        const check = await userService.findByEmail(email);
        if(check) {
            //return res.status(400).json({msg: "This email already existed!"})
            res.redirect("/register?error=This email already existed")
        }
        
        // const userNew = await userService.createUser(name, email, phone, address, username, password);
        // res.redirect('/login');
        const newUser = new userModel({
            name, email, username, password, phone, address
        })

        await newUser.save()

        // console.log("Account has been activated!")
        // res.json({msg: "Account has been activated!"})
        //res.redirect("/login?success=1")
        res.redirect("/login?success=Account has been activated!")
    } catch (err) {
        //return res.status(500).json({msg: err.message})
        res.redirect("/register?error=Something wrong, please try again")
    }
}

exports.postForget = async (req, res) => {
    try {
        const email  = await req.body.email;
        if (email == "") {
            res.redirect("/forget?mess=This email does not exist.");
        }
        else {
            const user = await userService.findByEmail(email);
            if (!user){
                res.redirect("/forget?mess=This email does not exist.");
            } 

            const access_token = createAccessToken(user);
            const url = `${CLIENT_URL}/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.redirect("/forget?mess=Reset the password, please check your email.")
        }
    } catch (err) {
        //return res.status(500).json({msg: err.message})
        res.redirect("/forget?mess=Something wrong, please try again")

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
        //return res.status(500).json({msg: err.message})
        res.redirect('/forget?mess=something wrong, please try again')
    }
}

exports.changePassword = async (req, res) => {
    res.render('authentication/changePassword', {
        title: 'changePassword',
        userID: req.params.id
    })
}

exports.change = async (req, res) => {
    const password = await req.body.password;
    const password2 = await req.body.password2;

    if (password !== password2) {
        // console.log("Password do not match");
        res.render('authentication/changePassword', {
            title: "changePassword",
            userID: req.params.id,
            mess: "wrong confirm password"
        });
        return;
    }

    await userService.updatePassword(req.params.id, password);
    //res.redirect("/login?success=2");
    res.redirect("/login?success=Reset password success")
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

