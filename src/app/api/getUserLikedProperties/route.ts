import connectToDatabase from '@/lib/mongodb';
import User from '../createUser/User';
import Property from '../addUserToProperty/Property';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json();
  const { id } = body;
  await connectToDatabase();
  const user = await User.findById(id);

  if (!user) {
    return Response.json({ message: 'Usuario no existe' }, { status: 400 });
  }

  const likedPropertiesIds = user.propertiesOfInterest || [];
  const likedProperties = await Property.find({
    _id: { $in: likedPropertiesIds }
  });
  return Response.json(
    {
      message: 'User logged',
      likedProperties
    },
    { status: 200 }
  );
}
