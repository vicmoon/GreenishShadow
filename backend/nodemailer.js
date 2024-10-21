const nodemailer = require('nodemailer');

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
  },
});

// Function to send an email
const sendConfirmationEmail = (email, weeklyLetter, gameUpdates) => {
  const subject = 'A Greenish Newsletter!';
  let text = 'Thank you for subscribing! 🦎';

  if (weeklyLetter && gameUpdates) {
    text = `You have subscribed to both Weekly Letters and Game Updates. Stay tuned for exciting news!`;
  } else if (weeklyLetter) {
    text = `You have subscribed to Weekly Letters. We'll keep you updated weekly!`;
  } else if (gameUpdates) {
    text = `You have subscribed to Game Updates. Stay tuned for the latest in our games!`;
  }

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Your email address
    to: email, // The email address of the user
    subject: subject,
    text: text,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending email:', error);
    }
    console.log('Email sent:', info.response);
  });
};

module.exports = sendConfirmationEmail;
