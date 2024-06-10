import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;
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
    console.log({
      user: userEmail,
      pass: userPassword
    });

    const mail = await transporter.sendMail({
      from: 'matijuncos@gmail.com',
      to: email,
      subject: `${name} Matcheaste con una propiedad!`,
      html: `<b>${message}</b>`
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
