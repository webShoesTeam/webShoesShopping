const userService = require('./userService');

const passport = require('passport');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
// Get Users model
const User = require('../../models/userModel');



const getRegister = (req, res) => {
    res.render('register', {
        title: 'Register',
    })
};

const postRegister =  async (req, res) => {
    
    const name = await req.body.name;
    const email = await req.body.email;
    const phone = await req.body.phone;
    const username = await req.body.username;
    const password = await req.body.password;
    const password2 = await req.body.password2;
    const address = await req.body.address;

    
    check('name', 'Name is required!').notEmpty();
    check('email', 'Email is required!').isEmail();
    check('phone', 'Email is required!').notEmpty();
    check('address', 'Email is required!').notEmpty();
    check('username', 'Username is required!').notEmpty();
    check('password', 'Password is required!').notEmpty();
    check('password2', 'Passwords do not match!').equals(password);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("loi empty validation");
        res.render('register', {
            errors: errors,
            title: 'Register'
        }); 
    }
    else {
        await User.where({username: username}).findOne( (err, user) => {
            if (err) {
                console.log("loi find user");
                console.log(err);
            }
            else if (user) {
                console.log("loi user exist");
                console.log("User\n" + user);
                //req.flash('danger', 'Username exist, choose another!');
                res.redirect('/users/register');
            } else {
                const user = new User({
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    username: username,
                    password: password,
                    role: 'user',
                    // role: role ?
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err)
                            console.log(err);

                        user.password = hash;

                        user.save(function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("success");
                                //req.flash('success', 'You are now registered!');
                                //res.redirect('/users/login')
                                res.redirect('/');
                            }
                        });
                    });
                });
            }

        }).clone().catch(function(err){ console.log(err)})
    }



}

const getLogin = (req, res) => {
    console.log("get login \n\n")
    if (res.locals.user) {
        res.redirect('/');
    }
    else {
        res.render('login', {
            title: 'Login',

        });
    }
}

const postLogin = (req, res, next) => {
    console.log("post login \n\n")
    console.log("req: " + req);
    console.log(req.body);
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        //failureFlash: true
    })(req, res, next);
}

const getLogout = (req, res) => {
    req.logout();    
    //req.flash('success', 'You are logged out!');
    res.redirect('/users/login');
};

module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    getLogout,
}