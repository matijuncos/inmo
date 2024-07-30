import User from '@/app/api/createUser/User';
import jwt from 'jsonwebtoken';
import connectToDatabase from './mongodb';

export async function authenticate(
  request: Request
): Promise<typeof User | null> {
  await connectToDatabase();
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
    if (!decoded || !decoded.userId) {
      return null;
    }

    const user = await User.findById(decoded.userId);
    if (!user?.admin) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}
