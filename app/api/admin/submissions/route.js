import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
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

function isAuthenticated(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  return cookieHeader.includes('admin_session=true');
}

export async function GET(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  const submissions = readSubmissions();
  // Most recent first
  return NextResponse.json({ success: true, submissions: submissions.reverse() });
}

export async function DELETE(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, '[]');
  return NextResponse.json({ success: true, message: 'All submissions cleared' });
}
