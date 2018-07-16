const passport         = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const User             = require('../models/User');

passport.use(new FacebookStrategy({
  clientID: "259039374692836",
  clientSecret: "c6bebdc9329bfb961204fd3e8182c416",
  callbackURL: "http://localhost:3000/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.create({ username: profile.displayName }, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
}
));

passport.serializeUser(function(user,cb){
  cb(null, user)
});

passport.deserializeUser(function(user,cb){
  cb(null, user)
})  

module.exports = passport;