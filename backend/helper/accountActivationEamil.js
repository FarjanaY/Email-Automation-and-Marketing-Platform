//EXternal imports
const nodemailer = require("nodemailer");
const { SMTP_USERNAME, SMTP_PASSWORD } = require("../config/dotenvExports");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,//true for 465, false for other ports
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

const sendEmailWithNodemailer = async (emailData) => {
  try {
    const mailOptions = {
      from: SMTP_USERNAME,
      to: emailData?.email,
      subject: emailData?.subject,
      html: emailData?.html,
    };
    const mailInfo = await transporter.sendMail(mailOptions);
    console.log("Message send : ", mailInfo);
  } catch (err) {
    console.log("Couldnot send email.Error occured.", err.message);
    throw err;
  }
};

module.exports = sendEmailWithNodemailer;
