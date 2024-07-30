import { NextResponse } from 'next/server';
import Property from '../../addUserToProperty/Property';
import { authenticate } from '@/lib/authenticate';
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const propertyId = params.id;
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
  try {
    const deleted = await Property.findOneAndDelete({ _id: propertyId });
    return NextResponse.json(
      { propertyRemoved: deleted, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error removing property', error);
    return NextResponse.json(
      { message: 'Something went wrong', success: false },
      { status: 500 }
    );
  }
}
