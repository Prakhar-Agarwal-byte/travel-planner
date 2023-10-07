const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "adarsh14304@gmail.com",
    pass: "hxyqsqhgibuvkcco"
  },
});

exports.sendMail = async function ({to, subject, text, html}){
    let info = await transporter.sendMail({
        from: "Travel-Planner", // sender address
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