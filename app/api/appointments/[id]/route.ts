import { updateAppointment, getAppointments } from '@/lib/db';
import {
  sendConfirmedToPatient,
  sendCancelledToPatient,
  sendCompletedToPatient,
} from '@/lib/emails';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  if (!body.status || !['pending', 'confirmed', 'completed', 'cancelled'].includes(body.status)) {
    return Response.json({ error: 'Invalid status' }, { status: 400 });
  }

  const updated = await updateAppointment(id, { status: body.status });
  if (!updated) {
    return Response.json({ error: 'Appointment not found' }, { status: 404 });
  }

  // Send email based on status change
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const formattedDate = new Date(updated.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const emailData = {
      name: updated.name,
      email: updated.email,
      service: updated.service,
      doctor: updated.doctor,
      date: formattedDate,
      time: updated.time,
    };

    try {
      if (body.status === 'confirmed') {
        await sendConfirmedToPatient(emailData);
      } else if (body.status === 'cancelled') {
        await sendCancelledToPatient(emailData);
      } else if (body.status === 'completed') {
        await sendCompletedToPatient(emailData);
      }
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the status update if email fails
    }
  }

  return Response.json(updated);
}
