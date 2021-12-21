const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userService = require('../components/user/userService');

passport.use(new LocalStrategy(
    async function(username, password, done) {      
        console.log("into passport localStrategy");
        
        const user = await userService.findByUsername(username);
        
        if (!user) {
            return done(null, false, {message: 'Incorrect username'});
        }

        if (user.isBanned == true) {
            return done(null, false, {message: 'This user is currently being banned'});
        }

        const isValid = await userService.validPassword(password, user);
        console.log("\n\n\nisValid: " + isValid)
        if (!isValid) {
            return done(null, false, {message: 'Incorrect password'});
        }

        return done(null, user);
    }
));


passport.serializeUser(function(user, done) {
    done(null, user.username , user._id);
  });
  
  passport.deserializeUser(async function(username, done) {
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });
    const user = await userService.findByUsername(username)
    done(null, user);
     
  });


module.exports = passport;