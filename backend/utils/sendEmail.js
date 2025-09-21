const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// sendMail({ to, subject, text, html })
const sendMail = async ({ to, subject, text, html }) => {
  const info = await transporter.sendMail({
    from: `"Airline Booking" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html
  });
  return info;
};

module.exports = sendMail;
