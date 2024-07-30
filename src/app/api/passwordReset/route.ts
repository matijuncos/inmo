import connectToDatabase from '@/lib/mongodb';
import User from '../createUser/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const userEmail = process.env.EMAIL;
  const userPassword = process.env.PASSWORD;

  const { email } = await request.json();
  await connectToDatabase();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: 'El usuario no exite' },
      { status: 404 }
    );
  }
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: userEmail,
      pass: userPassword
    }
  });
  try {
    const mail = await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: email,
      subject: `'Resetear contraseña Reset'`,
      text: `Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${token}`,
      html: `<strong>Click the link to reset your password: <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">Reset Password</a></strong>`
    });

    return NextResponse.json({ message: 'Email enviado' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Aglo salio mal' }, { status: 500 });
  }
}
