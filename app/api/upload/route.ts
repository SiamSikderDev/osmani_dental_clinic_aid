export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split('.').pop() || 'jpeg';
    const mime = file.type || `image/${ext === 'jpg' ? 'jpeg' : ext}`;
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${mime};base64,${base64}`;

    return Response.json({ url: dataUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}
