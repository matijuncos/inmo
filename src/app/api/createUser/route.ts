import connectToDatabase from '@/lib/mongodb';
import User from './User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, phone, fullName } = body;
  await connectToDatabase();
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return Response.json(
      { message: 'Ya existe un usuario con ese email' },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, phone, fullName });

  await user.save();
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
    expiresIn: '1h'
  });
  return Response.json(
    { message: 'User created successfully', user, token },
    { status: 201 }
  );
}
