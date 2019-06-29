var nodemailer = require('nodemailer');
function sendMailer(url,email){
var transporter=nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  })
  
  var mailOptions = {
    from: process.env.email,
    to: email,
    subject: "Verify your email",
    text:url
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}
module.exports= {sendMailer
}