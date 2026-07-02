import { getSettings, updateSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = await getSettings();
  return Response.json(settings);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await updateSettings(body);
    return Response.json(updated);
  } catch (error) {
    console.error('Settings update error:', error);
    return Response.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
