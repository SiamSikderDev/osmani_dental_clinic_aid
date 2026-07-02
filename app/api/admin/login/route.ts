import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { getSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

const COOKIE_NAME = 'admin_token';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return Response.json({ error: 'Password is required' }, { status: 400 });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('JWT_SECRET env variable is not set');
      return Response.json({ error: 'Server not configured. Set JWT_SECRET in Vercel environment variables.' }, { status: 500 });
    }

    // Check password against database first, then env var fallback
    const settings = await getSettings();
    const storedPassword = settings.adminPassword || process.env.ADMIN_PASSWORD;

    if (!storedPassword || password !== storedPassword) {
      return Response.json({ error: 'Invalid password' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(JWT_SECRET);

    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}
