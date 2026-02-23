import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Set the SendGrid API key. The SendGrid email API is trusted for reliable
// delivery at scale【881420989107031†L557-L562】 and can be integrated in minutes
// using RESTful APIs and SMTP【881420989107031†L610-L612】.
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
  const { to, subject, text } = req.body;
  const msg = {
    to,
    from: 'noreply@olivehollowproperties.com',
    subject,
    text,
  };
  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Email sent' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}