import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function emailShell(title: string, subtitle: string, body: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background:#F8FAFB;font-family:Inter,system-ui,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFB;padding:40px 20px;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
            <tr>
              <td style="background:linear-gradient(135deg,#1A6BCC,#00C2A8);padding:32px 40px;text-align:center;">
                <h1 style="color:#ffffff;font-size:24px;margin:0;font-weight:700;">${title}</h1>
                <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">${subtitle}</p>
              </td>
            </tr>
            <tr><td style="padding:32px 40px;">${body}</td></tr>
            <tr><td style="background:#EDF2F7;padding:20px 40px;text-align:center;">
              <p style="color:#94A3B8;font-size:12px;margin:0;">© ${new Date().getFullYear()} DentaCare. All rights reserved.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>
  `;
}

function detailsTable(data: { service: string; doctor: string; date: string; time: string }) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFB;border-radius:12px;padding:24px;margin:0 0 24px;">
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Service</td><td style="padding:8px 0;color:#1C2B3A;font-size:14px;font-weight:600;text-align:right;">${data.service}</td></tr>
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Doctor</td><td style="padding:8px 0;color:#1C2B3A;font-size:14px;font-weight:600;text-align:right;">${data.doctor || 'No preference'}</td></tr>
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Date</td><td style="padding:8px 0;color:#1C2B3A;font-size:14px;font-weight:600;text-align:right;">${data.date}</td></tr>
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Time</td><td style="padding:8px 0;color:#1C2B3A;font-size:14px;font-weight:600;text-align:right;">${data.time}</td></tr>
    </table>
  `;
}

export interface EmailData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
}

// Patient books → clinic gets notified (no email to patient yet)
export async function sendBookingReceivedToClinic(data: EmailData) {
  const html = `
    <p style="color:#1C2B3A;font-size:16px;margin:0 0 16px;">
      A new appointment request needs your review.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:12px;padding:16px;margin:0 0 20px;">
      <tr><td style="color:#9A3412;font-size:13px;font-weight:600;">&#9888; Action Required — Approve or decline in the admin dashboard.</td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFB;border-radius:12px;padding:24px;margin:0 0 24px;">
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Patient</td><td style="padding:8px 0;color:#1C2B3A;font-size:14px;font-weight:600;text-align:right;">${data.name}</td></tr>
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Email</td><td style="padding:8px 0;color:#1C2B3A;font-size:14px;font-weight:600;text-align:right;">${data.email}</td></tr>
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Phone</td><td style="padding:8px 0;color:#1C2B3A;font-size:14px;font-weight:600;text-align:right;">${data.phone || '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Service</td><td style="padding:8px 0;color:#1C2B3A;font-size:14px;font-weight:600;text-align:right;">${data.service}</td></tr>
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Doctor</td><td style="padding:8px 0;color:#1C2B3A;font-size:14px;font-weight:600;text-align:right;">${data.doctor || 'No preference'}</td></tr>
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Date</td><td style="padding:8px 0;color:#1C2B3A;font-size:14px;font-weight:600;text-align:right;">${data.date}</td></tr>
      <tr><td style="padding:8px 0;color:#64748B;font-size:13px;">Time</td><td style="padding:8px 0;color:#1C2B3A;font-size:14px;font-weight:600;text-align:right;">${data.time}</td></tr>
    </table>
  `;
  return transporter.sendMail({
    from: `"DentaCare Bookings" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Appointment Request: ${data.name} — ${data.date} ${data.time}`,
    html: emailShell('New Appointment Request', 'A patient is waiting for your approval', html),
  });
}

// Staff approves → patient gets confirmation
export async function sendConfirmedToPatient(data: EmailData) {
  const html = `
    <p style="color:#1C2B3A;font-size:16px;margin:0 0 8px;">Hi <strong>${data.name}</strong>,</p>
    <p style="color:#64748B;font-size:14px;line-height:1.7;margin:0 0 24px;">
      Great news! Your appointment has been <strong style="color:#00C2A8;">approved</strong>. Here are the details:
    </p>
    ${detailsTable(data)}
    <p style="color:#64748B;font-size:13px;line-height:1.7;margin:0 0 16px;">
      Please arrive 10 minutes before your scheduled time. If you need to reschedule or cancel, call us at <strong>+1 (555) 123-4567</strong> at least 24 hours in advance.
    </p>
    <p style="color:#64748B;font-size:13px;margin:0;">We look forward to seeing you!</p>
  `;
  return transporter.sendMail({
    from: `"DentaCare" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: `Appointment Confirmed — ${data.date} at ${data.time}`,
    html: emailShell('Appointment Confirmed!', 'DentaCare — Your Healthiest Smile Starts Here', html),
  });
}

// Staff cancels → patient gets notified
export async function sendCancelledToPatient(data: EmailData) {
  const html = `
    <p style="color:#1C2B3A;font-size:16px;margin:0 0 8px;">Hi <strong>${data.name}</strong>,</p>
    <p style="color:#64748B;font-size:14px;line-height:1.7;margin:0 0 24px;">
      We&apos;re sorry, but your appointment request could not be accommodated at this time.
    </p>
    ${detailsTable(data)}
    <p style="color:#64748B;font-size:13px;line-height:1.7;margin:0 0 16px;">
      Please call us at <strong>+1 (555) 123-4567</strong> or try booking a different time slot. We apologize for the inconvenience.
    </p>
  `;
  return transporter.sendMail({
    from: `"DentaCare" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: `Appointment Cancelled — ${data.date}`,
    html: emailShell('Appointment Cancelled', 'DentaCare — Your Healthiest Smile Starts Here', html),
  });
}

// Staff marks completed → patient gets thank you
export async function sendCompletedToPatient(data: EmailData) {
  const html = `
    <p style="color:#1C2B3A;font-size:16px;margin:0 0 8px;">Hi <strong>${data.name}</strong>,</p>
    <p style="color:#64748B;font-size:14px;line-height:1.7;margin:0 0 24px;">
      Thank you for visiting DentaCare! We hope you had a great experience.
    </p>
    ${detailsTable(data)}
    <p style="color:#64748B;font-size:13px;line-height:1.7;margin:0 0 16px;">
      Your feedback means the world to us. If you have a moment, we&apos;d love a review on Google.
    </p>
    <p style="color:#64748B;font-size:13px;margin:0;">Take care and see you next time!</p>
  `;
  return transporter.sendMail({
    from: `"DentaCare" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: `Thank You for Visiting DentaCare!`,
    html: emailShell('Thank You!', 'DentaCare — Your Healthiest Smile Starts Here', html),
  });
}
