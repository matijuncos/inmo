import connectToDatabase from '@/lib/mongodb';
import Property from '../addUserToProperty/Property';
import axios from 'axios';
import { authenticate } from '@/lib/authenticate';
require('../createUser/User');
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
    totalMeters,
    available
  } = body;
  try {
    await connectToDatabase();
    const admin = await authenticate(request);
    if (!admin) {
      return Response.json(
        {
          message: 'No autorizado'
        },
        {
          status: 401
        }
      );
    }
    if (!title || !location || !price || !images || !bedrooms || !bathrooms) {
      return Response.json({ message: 'Missing properties' }, { status: 400 });
    }
    const promises = images.map(async (imgPath: string) => {
      try {
        const formData = new FormData();
        formData.append('image', imgPath);

        const response = await axios.post(
          'https://api.imgbb.com/1/upload',
          formData,
          {
            params: {
              key: process.env.IMGBB_API_KEY
            },
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        return response.data.data.image.url;
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error(JSON.stringify(error));
      }
    });

    try {
      const imagesUrls = await Promise.all(promises);
      const newProperty = new Property({
        title,
        location,
        price,
        images: imagesUrls,
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
        totalMeters,
        available,
        interestedUsers: []
      });
      await newProperty.save();

      return Response.json(
        { message: 'Property Added', newProperty, success: true },
        { status: 201 }
      );
    } catch (error) {
      console.log(error);
      return Response.json(
        { message: 'Something went wrong with imgBB' },
        { status: 500 }
      );
    }
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
