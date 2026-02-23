import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
});

// $45.00 per adult applicant
const APPLICATION_FEE_CENTS = 4500;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { unitId, applicantEmail } = req.body as { unitId?: string; applicantEmail?: string };
  if (!unitId) return res.status(400).json({ error: 'Missing unitId' });

  try {
    const origin = req.headers.origin || '';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'us_bank_account'],
      customer_email: applicantEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Rental application fee',
              description: `Olive Hollow Properties application fee (Unit ${unitId})`,
            },
            unit_amount: APPLICATION_FEE_CENTS,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        kind: 'application_fee',
        unitId: String(unitId),
      },
      success_url: `${origin}/apply/${unitId}?paid=1`,
      cancel_url: `${origin}/apply/${unitId}?paid=0`,
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Stripe error' });
  }
}
