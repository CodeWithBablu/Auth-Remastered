const express = require("express");
const router = express.Router();
const passport = require("passport");

const homeController = require("../controller/home.controllers");

router.get("/signin", homeController.signIn);
router.get("/signup", homeController.signUp);

router.get("/verify", homeController.verifyEmail);
router.post("/create", homeController.create);

router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/auth/signin" }),
  homeController.createSession
);

//google authentitcation
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/signin" }),
  homeController.createSession
);

//facebook

//facebook authentication
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth/signin" }),
  homeController.createSession
);

module.exports = router;
