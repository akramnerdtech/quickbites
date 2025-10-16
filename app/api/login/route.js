// src/app/api/login/route.js

import { NextResponse } from 'next/server';

const users = [
  {
    email: "ayan@gmail.com",
    password: "ayan123",
    name: "Ayan khan"
  },
  {
    email: "akram@gmail.com",
    password: "akram123",
    name: "Akram"
  }
];

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
     
      return NextResponse.json({
        message: 'Login successful',
        user: { name: user.name, email: user.email }
      }, { status: 200 });
    } else {
      
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}