const nodemailer = require("nodemailer")

const ejs = require("ejs");
 
  
  exports.mainSend = ({otp,mail},callback)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pricee.work@gmail.com',
          pass: 'jqomhidqftbrmrnd'
        }
      });
      ejs.renderFile('C:/Users/Asus/Desktop/Pricee old setup/E-commerce/views/email.ejs', { otp:otp , email:mail}, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          var mailOptions = {
            from: '"Pricee Corporation" <Pricee@gmail.com>',
            to: mail,
            subject: "varification otp",
            html: data
          };
        }
        
        
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            callback(false)
          } else {
            console.log('Email sent: ' + info.response);
            callback(true)
          }
        });
      })
        
    }