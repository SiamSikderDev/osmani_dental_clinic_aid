import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getSettings, updateSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

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

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return Response.json({ error: 'Server not configured' }, { status: 500 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
    } catch {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate current password against database
    const settings = await getSettings();
    const storedPassword = settings.adminPassword || process.env.ADMIN_PASSWORD;

    if (!storedPassword || currentPassword !== storedPassword) {
      return Response.json({ error: 'Current password is incorrect' }, { status: 403 });
    }

    // Save new password to database
    await updateSettings({ adminPassword: newPassword });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Password update error:', error);
    return Response.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
