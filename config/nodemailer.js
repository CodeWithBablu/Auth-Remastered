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

const sendMail = async (email, subject, text, relativePath, link) => {
  try {
    const htmlTemplate = renderTemplate(relativePath, { link });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: subject,
      text: text,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email send successfully");
  } catch (error) {
    console.log("Error sending mail", error);
  }
};

module.exports = { transporter, renderTemplate, sendMail };
