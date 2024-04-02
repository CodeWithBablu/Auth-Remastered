// const passport = require("passport");

//we can also directly assign this function to passport obj and then access them as passport.functionName anywhere
module.exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) next();
  res.redirect("/auth/signin");
};

module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) res.redirect("/");
  next();
};

module.exports.setUserAsLocals = (req, res, next) => {
  res.locals.user = {};
  if (req.isAuthenticated()) res.locals.user = req.user;
  next();
};
