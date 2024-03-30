const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// create transporter that will send mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

//create ejs html template
const renderTemplate = (relativePath, data) => {
  let mailTemplate;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    (err, html) => {
      if (err) {
        console.log("Error in rendering template");
        return;
      }
      mailTemplate = html;
    }
  );

  return mailTemplate;
};

const sendMail = async (email, subject, link) => {
  try {
    const htmlTemplate = renderTemplate("/verify.email.ejs", { link });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "🎉 Welcome to the Fun Club! 🎉" || subject,
      text: `Hey there! Welcome to the Fun Club! 🎉\n\nTo join the party, please click on the following link to verify your email address: ${link}\n\nIf you're not feeling fun today, just ignore this message and we'll pretend it never happened. But where's the fun in that? 😜`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email send successfully");
  } catch (error) {
    console.log("Error sending mail", error);
  }
};

module.exports = { transporter, renderTemplate, sendMail };
