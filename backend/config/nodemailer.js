const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER, // gmail
    pass: process.env.GMAIL_PASSWORD, // pass
  },
});

exports.sendMail = async function ({to, subject, text, html}){
    let info = await transporter.sendMail({
        from: '"Travel-Planner" <travelplanner@gmail.com>', // sender address
        to,
        subject,
        text,
        html
      });
    return info;  
}

// example call for this function 

// mail 
// const link = `EMERGENCY_LINK`;
// const subject = "There is an Emergency";
// const text = `text`;
// const html = `
//   <p>Hello There</p>
//   <p>THEREIS AN EMERGENCY<p>`;

// if (email) {
//   const response = await sendMail({
//       to: email,
//       subject,
//       html,
//       text
//   });
// }