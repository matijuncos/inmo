import connectToDatabase from '@/lib/mongodb';
import Property from '../addUserToProperty/Property';

export async function POST(request: Request) {
  const body = await request.json();
  const {
    title,
    location,
    price,
    images,
    bedrooms,
    bathrooms,
    stories,
    pool,
    garage,
    isPrivate,
    antiquity,
    internet,
    ac,
    heat,
    gas,
    more,
    category,
    operationType,
    rooms,
    showPrice,
    coveredMeters,
    totalMenters,
    available
  } = body;
  try {
    await connectToDatabase();
    if (!title || !location || !price || !images || !bedrooms || !bathrooms) {
      return Response.json({ message: 'Missing properties' }, { status: 400 });
    }
    const newProperty = new Property({
      title,
      location,
      price,
      images,
      bedrooms,
      bathrooms,
      stories,
      pool,
      garage,
      isPrivate,
      antiquity,
      internet,
      ac,
      heat,
      gas,
      more,
      category,
      operationType,
      rooms,
      showPrice,
      coveredMeters,
      totalMenters,
      available,
      interestedUsers: []
    });
    await newProperty.save();

    return Response.json(
      { message: 'Property Added', newProperty },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
