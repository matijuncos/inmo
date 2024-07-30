import connectToDatabase from '@/lib/mongodb';
import Property from '../addUserToProperty/Property';
import { FilterQuery } from 'mongoose';
require('../createUser/User');

export async function GET(request: Request) {
  const url = new URL(
    request.url || '',
    `http://${request.headers.get('host')}`
  );
  const filters: FilterQuery<typeof Property> = {};

  // Helper function to parse comma-separated query parameters
  const parseMultiValueParam = (
    paramValue: string | null
  ): number[] | string[] => {
    if (!paramValue) return [];
    const values = paramValue.split(',');
    const allNumbers = values.every((value) => !isNaN(Number(value)));
    return allNumbers
      ? values.map(Number)
      : values.map((value) => value.trim());
  };

  // Applying filters for priceMin and priceMax using $gte and $lte
  const priceMinValues = parseMultiValueParam(url.searchParams.get('priceMin'));
  const priceMaxValues = parseMultiValueParam(url.searchParams.get('priceMax'));

  if (priceMinValues.length && priceMaxValues.length) {
    filters.$or = priceMinValues.map((min, index) => {
      const max = priceMaxValues[index] || priceMaxValues[0];
      return { price: { $gte: min, $lte: max } };
    });
  } else if (priceMinValues.length) {
    filters.price = { $gte: priceMinValues[0] };
  } else if (priceMaxValues.length) {
    filters.price = { $lte: priceMaxValues[0] };
  }

  // Filter for bedrooms
  const bedroomsValues = parseMultiValueParam(url.searchParams.get('bedrooms'));
  if (bedroomsValues.length) {
    filters.bedrooms = { $in: bedroomsValues };
  }

  // Filter for operationType
  const operationTypeValues = parseMultiValueParam(
    url.searchParams.get('operationType')
  );
  if (operationTypeValues.length) {
    filters.operationType = { $in: operationTypeValues };
  }

  // Filter for category
  const categoryValues = parseMultiValueParam(url.searchParams.get('category'));
  if (categoryValues.length) {
    filters.category = { $in: categoryValues };
  }

  console.log('filters', JSON.stringify(filters));
  try {
    await connectToDatabase();
    const properties = await Property.find(filters).populate(
      'interestedUsers',
      '-password'
    );

    return Response.json({ properties }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
