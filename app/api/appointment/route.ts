import { saveAppointment, getSettings } from '@/lib/db';
import { sendBookingReceivedToClinic } from '@/lib/emails';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, doctor, date, time } = body;

    if (!name || !email || !phone || !service || !date || !time) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Save to database
    await saveAppointment({
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      service,
      doctor: doctor || '',
      date,
      time,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    // Notify admin(s) — no email to patient yet
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const settings = await getSettings();
      await sendBookingReceivedToClinic({
        name,
        email,
        phone,
        service,
        doctor: doctor || '',
        date: formattedDate,
        time,
      }, settings.adminEmails || []);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Booking error:', error);
    return Response.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
