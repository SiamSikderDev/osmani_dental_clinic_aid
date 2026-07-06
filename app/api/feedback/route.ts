import { getSettings, updateSettings } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, text, image } = body;

    if (!name || !rating || !text) {
      return Response.json({ error: 'Name, rating, and review text are required.' }, { status: 400 });
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return Response.json({ error: 'Rating must be between 1 and 5.' }, { status: 400 });
    }

    const settings = await getSettings();

    const newTestimonial = {
      id: `feedback-${crypto.randomUUID()}`,
      name,
      rating,
      text,
      image: image || '/images/patient-review-1.jpeg',
    };

    await updateSettings({
      testimonials: [...settings.testimonials, newTestimonial],
    });

    return Response.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error('Feedback submission error:', error);
    return Response.json({ error: 'Failed to submit feedback.' }, { status: 500 });
  }
}
