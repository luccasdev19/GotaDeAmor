const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, text, html = null) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html: html || text,
    });
    console.log(`✓ Email enviado para: ${to}`);
    return true;
  } catch (error) {
    console.error(`✗ Erro ao enviar email: ${error.message}`);
    return false;
  }
};

module.exports = { transporter, sendEmail };
