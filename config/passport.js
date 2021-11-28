
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel');
var bcrypt = require('bcryptjs');


function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        console.log("inside authenticate");
        console.log("Pass, username: " + username);
        console.log("pass, password: " + password);
        await User.where({username: username}).findOne(function (err, user) {
            if (err) { 
                console.log("loi passport");
                return done(err); 
            }
            if (!user) { 
                console.log("!user");
                console.log(user);
                return done(null, false, { message: 'No user with that email' });
            } 
            console.log("user tim duoc:\n");
            console.log(user);
            console.log("us name: " + user.username);
            console.log("us pass: " + user.password);
            console.log("us id: " + user._id);
            bcrypt.compare(password, user.password, function (err, isMatch) {
                console.log("bcrypt, password: " + password);
                console.log("bcrypt, user.pass: " + user.password);
                if (err) {
                    console.log("loi compare");
                    console.log(err);
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    console.log("sai pass");
                    return done(null, false, {message: 'Wrong password.'});
                }
            });
        }).clone().catch(function(err){ console.log(err)});
    
    }


    passport.use(new LocalStrategy(authenticateUser))
    
    passport.serializeUser(function(user, done) {
        console.log("inside serialize");
        console.log("serialize: \n" + user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        console.log("inside deserialize");
        
        User.findById(id, function(err, user) {
            console.log("serialize: \n" + user);
            done(err, user);
            console.log("err in deserial: \n" +err);
        })
    });

}

module.exports = initialize;