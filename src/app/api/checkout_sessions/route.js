import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getUserSession } from '@/lib/core/session'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const formData = await request.formData();
    const amount = formData.get('amount');

    const unitAmount = Math.round(parseFloat(amount) * 100);

    const user = await getUserSession();

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email: user.email, 
      line_items: [
        {
          price_data: {
            currency: 'bdt', // Change this if you use another currency (e.g., 'bdt')
            product_data: {
              name: 'Donation Contribution',
            },
            unit_amount: unitAmount, // Uses the selected dynamic amount
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/funding/give-fund/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}