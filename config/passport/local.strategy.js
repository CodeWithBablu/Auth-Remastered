const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

//// authenticate already created user
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", //tells that req.email is to be used as username
      passwordField: "password", //tells that req.password is to be used as password (actually not neccessary because we have form feild as password already)
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      //find the user by email
      const user = await User.findOne({ email: email });

      // if user not found
      if (!user) {
        req.flash("error", "Invalid username. new here join the club 😍️!!");
        return done(null, false, { message: "wrong email" });
      }
      //if user not verified
      if (!user.isVerified) {
        req.flash("error", "Email verification pending 🥶️!!");
        return done(null, false, { message: "user not verified" });
      }

      //check password is correct
      const isPasswordMatched = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatched) {
        req.flash("error", "Invalid password. please try again 😵️!!");
        return done(null, false, { message: "wrong password" });
      }

      return done(null, user);
    }
  )
);

// after user credential are matched using strategy the serialized function will run
// it stores the recieved user into session so that it can be access later on in effecient manner
// ( i.e in req.session.passport.user=userId ) in our case
// this runs only first time user login
passport.serializeUser(function (user, done) {
  return done(null, user._id);
});

// on user subsequent request user is fetched from session using userId and attach to req.user object
passport.deserializeUser(async function (userId, done) {
  const user = await User.findById(userId);
  if (!user) {
    return done(null, false, { message: "error while deserializing user" });
  }
  return done(null, user);
});

// check if without export also works or not
module.exports = passport;
