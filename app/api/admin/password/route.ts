import { getSettings, updateSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return Response.json({ error: 'Current and new passwords are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return Response.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const settings = await getSettings();

    if (settings.adminPassword !== currentPassword) {
      return Response.json({ error: 'Current password is incorrect' }, { status: 403 });
    }

    await updateSettings({ adminPassword: newPassword });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Password update error:', error);
    return Response.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
