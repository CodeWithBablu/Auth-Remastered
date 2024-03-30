const bcrypt = require("bcrypt");
const crypto = require("crypto");

const nodemailer = require("../config/nodemailer");

const User = require("../config/models/user.model");
const Token = require("../config/models/token.model");

module.exports.signIn = (req, res) => {
  res.render("signin", { title: "Login" });
};

module.exports.signUp = (req, res) => {
  res.render("signup", { title: "SignUp" });
};

//explore andrew course
module.exports.create = async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    if (password !== cpassword) {
      console.log("password does not match");
      req.flash("error", "Confirm password not matched!!");
      res.redirect("back");
    }

    //check if user already exits
    let user = await User.findOne({ email });

    //Insert new user if not exist
    if (!user) {
      //hash the password before saving into database
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      user = await User.create({
        name,
        email,
        password: hashPass,
        isVerified: false,
      });

      await user.save();

      //Generating user token for email verification
      let genToken = crypto.randomBytes(16).toString("hex");

      const token = await Token.create({
        userId: user._id,
        token: genToken,
      });

      await token.save();

      const link = `${process.env.BASE_URL}/auth/verify?token=${genToken}`;
      await nodemailer.sendMail(email, "", link);
      req.flash("success", "Email verification link sent to your email!!");
      return res.redirect("back");
    } else {
      req.flash("success", "Email already exists. Please login!!");
      res.redirect("/auth/signin");
    }
  } catch (error) {
    console.log("Error in create user controller ", error);
  }
};

module.exports.verifyEmail = async (req, res) => {
  const genToken = req.query.token;
  console.log(genToken);

  let token = await Token.findOne({ token: genToken });

  if (!token) {
    req.flash(
      "error",
      "We were unable to find a valid token.Your token may have expired."
    );
    return res.redirect("/auth/signup");
  }

  // find matching user
  const user = await User.findOne({ _id: token.userId });
  if (!user) {
    req.flash("error", "We were unable to find a user for this token.");
    return res.redirect("/auth/signup");
  }

  user.isVerified = true;
  await user.save();
  req.flash("success", "Email Verified SuccessFully Please Login");
  await Token.deleteOne(token);
  return res.redirect("/auth/signin");
};
