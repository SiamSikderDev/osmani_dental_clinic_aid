import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const COOKIE_NAME = 'admin_token';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return Response.json({ error: 'Password is required' }, { status: 400 });
    }

    if (!ADMIN_PASSWORD) {
      console.error('ADMIN_PASSWORD env variable is not set');
      return Response.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (password !== ADMIN_PASSWORD) {
      return Response.json({ error: 'Invalid password' }, { status: 401 });
    }

    if (!JWT_SECRET || JWT_SECRET.length === 0) {
      console.error('JWT_SECRET env variable is not set');
      return Response.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}
