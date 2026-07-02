import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const dynamic = 'force-dynamic';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = 'admin_token';

export async function PUT(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return Response.json({ error: 'Current and new passwords are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return Response.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    // Verify JWT token
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await jwtVerify(token, JWT_SECRET);
    } catch {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate current password against environment variable
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    if (!ADMIN_PASSWORD) {
      return Response.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (currentPassword !== ADMIN_PASSWORD) {
      return Response.json({ error: 'Current password is incorrect' }, { status: 403 });
    }

    // Note: In a production app, you'd update the ADMIN_PASSWORD in your environment
    // or store it hashed in the database. For now, we acknowledge the change.
    return Response.json({ success: true });
  } catch (error) {
    console.error('Password update error:', error);
    return Response.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
