var nodemailer = require('nodemailer');
var smtpConfig = require("./emailconfig.json");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);


exports.sendMail = function  (mailOptions) {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    });
}