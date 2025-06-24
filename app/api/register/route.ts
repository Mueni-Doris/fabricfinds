import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, phone_number, username, email, location, password } = body;

    if (!full_name || !phone_number || !username || !email || !location || !password) {
      return NextResponse.json({ message: 'Please fill all fields' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        full_name,
        phone_number,
        username,
        email,
        location,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ message: error.message || 'Internal server error' }, { status: 500 });
  }
}
