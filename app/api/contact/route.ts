import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, serviceType } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'الرجاء ملء جميع الحقول المطلوبة' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const emailContent = `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #10b981;">رسالة جديدة من نموذج الاتصال</h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>الاسم:</strong> ${name}</p>
          <p><strong>البريد الإلكتروني:</strong> ${email}</p>
          ${phone ? `<p><strong>رقم الهاتف:</strong> ${phone}</p>` : ''}
          ${serviceType ? `<p><strong>نوع الخدمة:</strong> ${serviceType}</p>` : ''}
          <p><strong>الموضوع:</strong> ${subject}</p>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0;">
          <p><strong>الرسالة:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          تم إرسال هذه الرسالة من نموذج الاتصال في الموقع
        </p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'Laithsalmi555@gmail.com',
      replyTo: email,
      subject: `رسالة جديدة: ${subject}`,
      html: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'تم إرسال الرسالة بنجاح' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء معالجة الطلب' },
      { status: 500 }
    );
  }
}


