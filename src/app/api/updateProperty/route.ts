import { NextResponse } from 'next/server';
import Property from '../addUserToProperty/Property';

export async function PUT(request: Request) {
  const body = await request.json();
  const { _id, ...property } = body;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(_id, property);
    if (updatedProperty) {
      return NextResponse.json({
        success: true,
        property: updatedProperty
      });
    }
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Something Went wrong'
      },
      { status: 500 }
    );
  }
}
