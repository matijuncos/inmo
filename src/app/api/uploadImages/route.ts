import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('image') as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, since we're handling it with formData
  }
};
