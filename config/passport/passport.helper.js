// const passport = require("passport");

//we can also directly assign this function to passport obj and then access them as passport.functionName anywhere
module.exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/auth/signin");
};

module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/");
  return next();
};

module.exports.setUserAsLocals = (req, res, next) => {
  if (req.isAuthenticated()) res.locals.user = req.user;
  else res.locals.user = {};
  next();
};
