import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail', // puedes usar cualquier servicio de correo
  auth: {
    user: process.env.EMAIL, // tu correo electrónico
    pass: process.env.EMAIL_PASSWORD, // tu contraseña
  },
});

export const sendVerificationEmail = (email, token) => {
  const verificationLink = `http://localhost:4000/api/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Verificación de Email',
    html: `<h2>Verificación de Email</h2>
           <p>Por favor, haz clic en el siguiente enlace para verificar tu cuenta:</p>
           <a href="${verificationLink}">Verificar Email</a>`,
  };

  return transporter.sendMail(mailOptions)
    .then(info => console.log(`Email enviado: ${info.response}`))
    .catch(error => console.error(`Error al enviar email: ${error}`));
};