'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData) {
  const password = formData.get('password')
  const correctPassword = process.env.APP_PASSWORD

  if (password === correctPassword) {
    // Set cookie valid for 1 day
    // Using a simple value for this basic gate.
    // In a real app, use a signed session token.
    cookies().set('auth', 'authenticated', {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24
    })
    redirect('/dashboard')
  } else {
    redirect('/?error=1')
  }
}