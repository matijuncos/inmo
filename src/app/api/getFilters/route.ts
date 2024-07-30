import connectToDatabase from '@/lib/mongodb';
import Property from '../addUserToProperty/Property';
import { NextApiRequest, NextApiResponse } from 'next';

require('../createUser/User');

export async function GET(request: Request, response: NextApiResponse) {
  try {
    await connectToDatabase();

    const categories = await Property.distinct('category');
    const operationTypes = await Property.distinct('operationType');
    const prices = await Property.distinct('price');
    const bedrooms = await Property.distinct('bedrooms');
    // Add more distinct queries for other filters if needed

    return Response.json({ prices, categories, operationTypes, bedrooms });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Something went wrong' });
  }
}
