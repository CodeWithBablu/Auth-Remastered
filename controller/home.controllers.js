const bcrypt = require("bcrypt");
const crypto = require("crypto");

const nodemailer = require("../config/nodemailer");

const User = require("../config/models/user.model");
const Token = require("../config/models/token.model");

//// signIn
module.exports.signIn = (req, res) => {
  res.render("signin", { title: "Login" });
};

//// signUp
module.exports.signUp = (req, res) => {
  res.render("signup", { title: "SignUp" });
};

//explore andrew course
//// Create new user using email & pass
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
      await nodemailer.sendMail(
        email,
        "🎉 Welcome to the Fun Club! 🎉",
        `Hey there! Welcome to the Fun Club! 🎉\n\nTo join the party, please click on the following link to verify your email address: ${link}\n\nIf you're not feeling fun today, just ignore this message and we'll pretend it never happened. But where's the fun in that? 😜`,
        "/verify.email.ejs",
        link
      );
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

//// verify email
module.exports.verifyEmail = async (req, res) => {
  const genToken = req.query.token;

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

  // set isVerified as true and save the user
  user.isVerified = true;
  await user.save();
  req.flash("success", "Email Verified SuccessFully Please Login");
  await Token.deleteOne(token);
  return res.redirect("/auth/signin");
};

//// create session when user login
module.exports.createSession = async (req, res) => {
  try {
    req.flash("success", "Logged in Successfully");
    return res.redirect("/profile");
  } catch (error) {
    console.log("Error in creating session : ", error);
    return res.redirect("back");
  }
};

//// reset Request page
module.exports.resetRequest = (req, res) => {
  return res.render("reset-request", { title: "Reset Request" });
};

//// reset passpord page
module.exports.resetPassword = (req, res) => {
  return res.render("reset-password", { title: "Reset Password" });
};

//// reset Passpord request
module.exports.resetLink = (req, res) => {
  try {
    console.log(req.path);
  } catch (error) {
    console.log("Error in resetting passpord");
    req.flash("error", "Error in resetting passpord");
  }
};
