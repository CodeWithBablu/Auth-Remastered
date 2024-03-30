const express = require("express");
const router = express.Router();

const homeController = require("../controller/home.controllers");

router.get("/signin", homeController.signIn);
router.get("/signup", homeController.signUp);

router.get("/verify", homeController.verifyEmail);
router.post("/create", homeController.create);

module.exports = router;
