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

module.exports = router;
