const express = require("express");
const router = express.Router();

const { checkAuthenticated } = require("../config/passport/passport.helper");

const authRouter = require("./auth");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Auth-Remastered" });
});

router.get("/profile", checkAuthenticated, function (req, res) {
  res.render("profile", { title: "Profile" });
});

router.use("/auth", authRouter);

module.exports = router;
