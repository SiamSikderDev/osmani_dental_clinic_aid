import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = 'admin_token';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return Response.json({ error: 'No token' }, { status: 401 });
    }

    await jwtVerify(token, JWT_SECRET);
    return Response.json({ valid: true });
  } catch {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }
}
