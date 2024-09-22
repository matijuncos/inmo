export const mailTemplate = (propertyName: string, fullName: string) => {
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
<h1 style="color: #2c3e50; font-size: 28px; text-align: center;">¡Hola ${fullName}!</h1>
<p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Gracias por tu interés en nuestra propiedad: <strong style="color: #2980b9;">${propertyName}</strong>.</p>
<p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Creemos que esta propiedad podría ser perfecta para ti, ¡y estamos emocionados de poder ofrecértela!</p>
<p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Un representante se pondrá en contacto contigo pronto para responder a cualquier pregunta y brindarte más información.</p>
<p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">¡Gracias de nuevo por tu interés!</p>
<p style="font-size: 18px; line-height: 1.6; color: #2c3e50; text-align: center; font-weight: bold;">El Equipo de Santamarina $ Asoc.</p>
</div>
  `;
};

export const mailTemplateTwo = (propertyName: string, fullName: string) => {
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
<h1 style="color: #2c3e50; font-size: 28px; text-align: center;">A ${fullName} le interesa una propiedad!</h1>
<p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Propiedad: <strong style="color: #2980b9;">${propertyName}</strong>.</p>
<p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Entra a tu panel de administracion y revisa quien es el/la interesado/a. El/Ella ya fue notificado/a por mail!</p>
</div>
  `;
};

export const mailTemplateThree = (propertyName: string, fullName: string) => {
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
<h1 style="color: #2c3e50; font-size: 28px; text-align: center;">¡Hola ${fullName}!</h1>
<p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Gracias por tu interés en nuestra propiedad: <strong style="color: #2980b9;">${propertyName}</strong>.</p>
<p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Creemos que esta propiedad podría ser perfecta para ti, ¡y estamos emocionados de poder ofrecértela!</p>
<p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Un representante se pondrá en contacto contigo pronto para responder a cualquier pregunta y brindarte más información.</p>
<p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">¡Gracias de nuevo por tu interés!</p>
<p style="font-size: 18px; line-height: 1.6; color: #2c3e50; text-align: center; font-weight: bold;">El Equipo de Santamarina & Asoc.</p>
</div>
  `;
};

export const mailTemplateFour = (
  propertyName: string,
  fullName: string,
  phoneNumber: string,
  email: string
) => {
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
<h1 style="color: #2c3e50; font-size: 28px; text-align: center;">A ${fullName} le interesa una propiedad!</h1>
<p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Propiedad: <strong style="color: #2980b9;">${propertyName}</strong>.</p>
<p style="font-size: 18px; line-height: 1.6; color: #7f8c8d; text-align: justify;">Entra a tu panel de administracion y revisa quien es el/la interesado/a. El/Ella ya fue notificado/a por mail!</p>
<p>Email: ${email}</p>
<p>Telefono: ${phoneNumber}</p>
</div>
  `;
};
