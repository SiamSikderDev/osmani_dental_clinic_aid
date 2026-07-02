import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';
import { SiteSettings, defaultSettings } from './settings';

export interface Appointment {
  _id?: ObjectId;
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export async function getAppointments(): Promise<Appointment[]> {
  const { db } = await connectToDatabase();
  const appointments = await db
    .collection('appointments')
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return appointments as Appointment[];
}

export async function saveAppointment(appt: Appointment): Promise<void> {
  const { db } = await connectToDatabase();
  await db.collection('appointments').insertOne(appt);
}

export async function updateAppointment(
  id: string,
  updates: Partial<Pick<Appointment, 'status'>>
): Promise<Appointment | null> {
  const { db } = await connectToDatabase();
  const result = await db
    .collection('appointments')
    .findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after' }
    );
  return result as Appointment | null;
}

// Settings
export async function getSettings(): Promise<SiteSettings> {
  const { db } = await connectToDatabase();
  const doc = await db.collection('settings').findOne({ _key: 'site' });
  if (!doc) {
    await db.collection('settings').insertOne({ _key: 'site', ...defaultSettings });
    return defaultSettings;
  }
  const { _key, _id, ...settings } = doc;
  return { ...defaultSettings, ...settings } as SiteSettings;
}

export async function updateSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const { db } = await connectToDatabase();
  await db.collection('settings').updateOne(
    { _key: 'site' },
    { $set: updates },
    { upsert: true }
  );
  return getSettings();
}
