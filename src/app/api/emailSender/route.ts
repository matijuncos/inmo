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
    await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: email,
      subject: `${name} Matcheaste con una propiedad!`,
      html: `<b>${message}</b>`
    });

    await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      subject: `A ${name} le interesa una propiedad!`,
      html: `<b>${message2}</b>`
    });

    return Response.json({
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
