const nodemailer = require('nodemailer');

const sendRecoveryEmail = async (to, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Código de recuperación de contraseña',
    text: `Tu código de recuperación es: ${code}. Este código expirará en 1 hora.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendRecoveryEmail;
