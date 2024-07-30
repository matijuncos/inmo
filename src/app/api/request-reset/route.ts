import connectToDatabase from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../createUser/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password, token } = await request.json();
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
    const userId = decoded.userId;

    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json({ message: 'Password actualizado' });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' });
  }
}
