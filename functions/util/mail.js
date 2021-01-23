const mailer = require('nodemailer');

const sendEmail = (to,subject,body) => {

    const smtpTransport = mailer.createTransport({
        service:"gmail",
        auth: {
            user: 'bluetacinfo@gmail.com', // generated ethereal user
            pass: 'bluetactest'  // generated ethereal password
        }
    });

    const mailOptions = {
        from: 'bluetacinfo@gmail.com',
        to:to,
        subject: subject,
        text: body
    };

    smtpTransport.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        smtpTransport.close();
    })
}

module.exports = { sendEmail }