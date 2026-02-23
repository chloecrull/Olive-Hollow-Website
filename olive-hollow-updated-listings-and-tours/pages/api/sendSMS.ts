import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

// Initialize the Twilio client using your Account SID and Auth Token. The
// Programmable Messaging API adds SMS capabilities to your application and
// authenticates requests using API keys【29060598208859†L217-L279】.
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID || '',
  process.env.TWILIO_AUTH_TOKEN || ''
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
  const { to, body } = req.body;
  try {
    await client.messages.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER || '',
      body,
    });
    return res.status(200).json({ message: 'SMS sent' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}