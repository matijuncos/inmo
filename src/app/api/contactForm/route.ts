import { emailFormTemplate } from './utils';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const userEmail = process.env.EMAIL;
  const userPassword = process.env.PASSWORD;

  const {
    nombre,
    email,
    telefono,
    tipoPropiedad,
    domicilioPropiedad,
    mensaje,
    tipoConsulta
  } = await request.json();
  const mailTemplate = emailFormTemplate({
    nombre,
    email,
    telefono,
    tipoPropiedad,
    domicilioPropiedad,
    mensaje,
    tipoConsulta
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    // port: 465,
    secure: true,
    auth: {
      user: userEmail,
      pass: userPassword
    }
  });
  try {
    await transporter.sendMail({
      from: email,
      to: process.env.MY_EMAIL,
      subject: `Nueva consulta`,
      html: mailTemplate
    });
    await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: email,
      subject: `Tu consulta fue enviada`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { width: 80%; margin: 20px auto; padding: 20px; border: 1px solid #ccc; background-color: #f9f9f9; }
    .message { font-size: 1.1em; }
    .footer { margin-top: 20px; font-style: italic; }
  </style>
</head>
<body>
  <div class="container">
    <p class="message">
      Tu consulta fue enviada y será respondida en breve. Muchas gracias por contactarnos.
    </p>
    <p class="footer">Saludos cordiales,<br>El Equipo de Soporte</p>
  </div>
</body>
</html>
`
    });
    return Response.json(
      {
        message: 'Mail sent'
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: 'Something went wrong'
      },
      {
        status: 500
      }
    );
  }
}
