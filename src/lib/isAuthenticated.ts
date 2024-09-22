import User from '@/app/api/createUser/User';
import jwt from 'jsonwebtoken';
import connectToDatabase from './mongodb';
export async function isAuthenticated(
  request: Request
): Promise<typeof User | null> {
  await connectToDatabase();
  try {
    const token = request.headers.get('token')?.replace('Bearer ', '');
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
    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
