const nodemailer = require('nodemailer');

const sender = 'contact.sese.a@gmail.com'

// Create a transporter
const transporter = nodemailer.createTransport({
    // You can use any email service
    service: 'Gmail', 
    auth: {
        user: sender,
        pass: 'Boruto3600!'
    }
});

module.exports = { transporter, sender }