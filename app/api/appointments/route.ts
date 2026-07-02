import { getAppointments } from '@/lib/db';

export async function GET() {
  const appointments = await getAppointments();
  // Return newest first
  appointments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return Response.json(appointments);
}
