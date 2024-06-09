import connectToDatabase from '@/lib/mongodb';
import Property from '../addUserToProperty/Property';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const properties = await Property.find().populate(
      'interestedUsers',
      '-password'
    );

    return Response.json({ properties }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
