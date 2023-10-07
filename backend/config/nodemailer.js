const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
})

exports.sendMail = async ({ to, subject, text, html }) => {
  try {
    return await transporter.sendMail({
      from: '"Travel-Planner" <travel-planner-sos@hotmail.com>',
      to,
      subject,
      text,
      html
    })
  } catch (err) {
    console.log(err);
    throw err;
  }
};