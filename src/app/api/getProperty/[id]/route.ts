import { NextResponse } from 'next/server';
import Property from '../../addUserToProperty/Property';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const propertytoEdit = await Property.findById(params.id);
    if (!propertytoEdit) {
      return NextResponse.json(
        { message: 'Property not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        property: propertytoEdit,
        success: true
      },
      {
        status: 200
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Something went wrong',
        success: false
      },
      {
        status: 500
      }
    );
  }
}
