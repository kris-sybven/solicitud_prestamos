import { createTransport } from 'nodemailer';

// Configuración del transporte de correo
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'krisangelacespedes@gmail.com',
    pass: 'erfmypbnloivalyo',
  },
});

const mailOptions = {
    from: 'krisangelacespedes@gmail.com',
    to: 'krisangelabackup@gmail.com',
    subject: 'Asunto del correo electrónico',
    text: 'Contenido del correo electrónico',
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
  
  /*
  Servidor SMTP: smtp.gmail.com
Usuario SMTP: Tu dirección completa de Gmail, como tuemail@gmail.com
Contraseña SMTP: Tu contraseña de Gmail.
Puerto SMTP: 465 (SSL)/587 (TLS)
TLS/SSL: Requerido.
  */

