import connectToDatabase from '@/lib/mongodb';
import Property from './Property';
import User from '../createUser/User';

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, id } = body;
  try {
    await connectToDatabase();
    const property = await Property.findById(id);
    const user = await User.findById(userId);
    if (!property || !user) {
      return Response.json(
        { message: 'Wrong property or user id' },
        { status: 404 }
      );
    }
    if (!property.interestedUsers.includes(userId)) {
      property.interestedUsers.push(userId);
      await property.save();
      if (!user.propertiesOfInterest?.includes(id)) {
        user.propertiesOfInterest.push(id);
        await user.save();
      }
      return Response.json(
        { message: 'User added to interested list' },
        { status: 201 }
      );
    } else {
      return Response.json(
        { message: 'User already in interested list' },
        { status: 409 }
      );
    }
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
