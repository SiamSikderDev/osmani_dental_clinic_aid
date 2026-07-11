import { put } from '@vercel/blob';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    const ext = file.name.split('.').pop() || 'jpeg';
    const filename = `${crypto.randomUUID()}.${ext}`;

    const blob = await put(filename, file, {
      access: 'public',
    });

    return Response.json({ url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}
