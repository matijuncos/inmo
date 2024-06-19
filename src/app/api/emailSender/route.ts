import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message, message2 } = body;
  const userEmail = process.env.EMAIL;
  const userPassword = process.env.PASSWORD;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: userEmail,
        pass: userPassword
      }
    });
    const mail = await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: email,
      subject: `${name} Matcheaste con una propiedad!`,
      html: `<b>${message}</b>`
    });

    const mail2 = await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      subject: `A ${name} le interesa una propiedad!`,
      html: `<b>${message2}</b>`
    });
    console.log('Message sent: %s', mail.messageId);

    return Response.json({
      error: null,
      success: true
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error: (error as Error).message,
      success: false
    });
  }
}
