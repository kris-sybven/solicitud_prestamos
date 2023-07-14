const cds = require('@sap/cds');
const nodemailer = require('nodemailer');

module.exports = cds.service.impl(async (srv) => {
  srv.on('sendEmail', async (req) => {
    const { name, email, message } = req.data;

    try {
      // Configura el transportador de correo
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'krisangelacespedes@gmail.com',
          pass: 'erfmypbnloivalyo',
        },
      });

      // Define el mensaje de correo electrónico
      const mailOptions = {
        from: 'krisangelacespedes@gmail.com',
        to: email,
        subject: 'Mensaje de contacto',
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
      };

      // Envía el correo electrónico
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.response);

      return {
        success: true,
        message: 'Correo enviado correctamente',
      };
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error('Error al enviar el correo');
    }
  });
});
