exports.hasLogin = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    //req.flash('Warning', 'You are logged in');
    res.redirect('/login');      
}

exports.notLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    //req.flash('Warning', 'You are logged in');
    res.redirect('/');      
}