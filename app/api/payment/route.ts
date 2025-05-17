import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { NextResponse, type NextRequest } from 'next/server';
import db from '@/utils/db';
import { formatDate } from '@/utils/format';

export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get('origin');
  const { donationId } = await req.json();

  const donation = await db.donation.findUnique({
    where: { id: donationId },
    include: {
      campaign: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  if (!donation) {
    return NextResponse.json(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }
  const {
    orderTotal,
    createdAt,
    campaign: { image, name },
  } = donation;

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { donationId: donation.id },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${name}`,
              images: [image],
              description: `You are supporting this fundraise for ${orderTotal}$, at ${formatDate(
                createdAt
              )} . Thank you for your support!`,
            },
            unit_amount: orderTotal * 100,
          },
        },
      ],
      mode: 'payment',
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};