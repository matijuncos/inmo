import EmailTemplate from '@/app/components/EmailTemplate';
import { Resend } from 'resend';
export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log(EmailTemplate({ name, email, message }));
    await resend.emails.send({
      from: 'Inmobiliaria <shahmir@mydevpa.ge>',
      to: email,
      subject: 'Inmobiliaria',
      react: JSON.stringify(EmailTemplate({ name, email, message }))
    });
    return Response.json({
      error: null,
      success: true
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error: (error as Error).message,
      success: false
    });
  }
}
