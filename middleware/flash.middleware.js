module.exports.notification = async (req, res, next) => {
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next();
};
