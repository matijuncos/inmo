import connectToDatabase from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import User from '../createUser/User';
import jwt from 'jsonwebtoken';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user) {
    return Response.json(
      { message: 'Usuario o contraseña incorrecta' },
      { status: 400 }
    );
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return Response.json(
      { message: 'Usuario o contraseña incorrecta' },
      { status: 400 }
    );
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
    expiresIn: '1h'
  });

  const headers = new Headers({
    'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=${
      60 * 60
    }; SameSite=Strict`
  });

  return Response.json(
    {
      message: 'User logged',
      token,
      userId: user._id,
      name: user.fullName,
      email: user.email,
      ...(user.propertiesOfInterest && {
        propertiesOfInterest: user.propertiesOfInterest
      }),
      ...(user.admin && { admin: user.admin })
    },
    { status: 200, headers }
  );
}
