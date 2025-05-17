import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from 'next/navigation';

import { type NextRequest, type NextResponse } from 'next/server';
import db from '@/utils/db';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id') as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const donationId = session.metadata?.donationId;
    if (session.status !== 'complete' && !donationId) {
        throw new Error('Something went wrong');
    }
    await db.donation.update({
        where: { id: donationId },
        data: { paymentStatus: true },
    });
  } catch (err) {
    console.log(err);
    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
  redirect('/donations');
};