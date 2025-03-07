const {transporter, sender} = require("../utility/emailUtility")

module.exports = {
    sendEmail: async (subject, text, receiver) => {

    const mailOptions = {
        from: sender,
        to: receiver,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
    }
}