import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe client using the secret key. You must set STRIPE_SECRET_KEY in
// your environment variables. Stripe Payments supports over 100 payment methods
// including cards and ACH Direct Debit【120047348330141†L570-L575】.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
  const { amount, unitId } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'us_bank_account'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Rent payment for unit ${unitId}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/tenant?success=true`,
      cancel_url: `${req.headers.origin}/tenant?canceled=true`,
    });
    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}