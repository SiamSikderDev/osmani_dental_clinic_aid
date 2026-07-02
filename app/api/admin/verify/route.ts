import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const COOKIE_NAME = 'admin_token';

export async function GET() {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return Response.json({ error: 'Server not configured' }, { status: 500 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return Response.json({ error: 'No token' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    return Response.json({ valid: true });
  } catch {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }
}
