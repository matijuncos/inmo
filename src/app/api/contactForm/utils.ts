export const emailFormTemplate = ({
  nombre,
  email,
  telefono,
  tipoPropiedad,
  domicilioPropiedad,
  mensaje,
  tipoConsulta
}: {
  nombre: string;
  email: string;
  telefono: string;
  tipoPropiedad: string;
  domicilioPropiedad: string;
  mensaje: string;
  tipoConsulta: string;
}) => {
  const cuerpoCorreo = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { width: 80%; margin: 20px auto; padding: 20px; border: 1px solid #ccc; }
        .greeting { font-size: 1.2em; }
        .details { margin-top: 20px; }
        .footer { margin-top: 20px; font-style: italic; }
      </style>
    </head>
    <body>
      <div class="container">
        <p class="greeting">Hola,</p>
        <p>Has recibido una nueva solicitud de contacto. Aquí están los detalles:</p>
        <div class="details">
          <strong>Nombre:</strong> ${nombre}<br>
          <strong>Correo electrónico:</strong> ${email}<br>
          <strong>Teléfono:</strong> ${telefono}<br>
          <strong>Tipo de Propiedad:</strong> ${tipoPropiedad}<br>
          <strong>Domicilio de la Propiedad:</strong> ${domicilioPropiedad}<br>
          <strong>Mensaje:</strong> ${mensaje}<br>
          <strong>Tipo de Consulta:</strong> ${tipoConsulta}
        </div>
        <p class="footer">Saludos cordiales.</p>
      </div>
    </body>
    </html>
  `;
  return cuerpoCorreo;
};
