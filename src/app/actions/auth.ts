'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Simple hardcoded check for demo purposes
    if (email === 'admin@ljf.com' && password === 'admin123') {
        // Set cookie
        cookies().set('admin_session', 'true', { httpOnly: true, path: '/' });
        redirect('/admin/dashboard');
    } else {
        redirect('/admin/login?error=Invalid credentials');
    }
}

export async function logout() {
    cookies().delete('admin_session');
    redirect('/admin/login');
}

export async function checkAuth() {
    const session = cookies().get('admin_session');
    if (!session) {
        redirect('/admin/login');
    }
}
