import { NextResponse } from 'next/server';
import Property from '../addUserToProperty/Property';
import axios from 'axios';
import { authenticate } from '@/lib/authenticate';

export async function PUT(request: Request) {
  const body = await request.json();
  const { _id, ...property } = body;
  const { newFiles, ...rest } = property;
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
    const promises = newFiles.map(async (imgPath: string) => {
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
    const imagesUrls = await Promise.all(promises);
    const updatedProperty = await Property.findByIdAndUpdate(_id, {
      ...rest,
      images: [...rest.images, ...imagesUrls]
    });
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
