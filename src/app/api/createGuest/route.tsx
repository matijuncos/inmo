import connectToDatabase from '@/lib/mongodb';
import Guest from './Guest';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, phone, fullName } = await request.json();
    await connectToDatabase();
    const existingGuest = await Guest.findOne({ email });
    let token;
    if (existingGuest) {
      token = generateToken(existingGuest._id);
      return Response.json(
        {
          message: 'Guest already registered',
          user: existingGuest,
          token,
          userId: existingGuest._id
        },
        { status: 200 }
      );
    }
    const guest = new Guest({ email, phone, fullName });
    await guest.save();
    token = generateToken(guest._id);
    return Response.json(
      {
        message: 'User created successfully',
        user: guest,
        token,
        userId: guest._id
      },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json(
      { message: 'Failed to create guest', error: error.message },
      { status: 500 }
    );
  }
}

function generateToken(userId: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
