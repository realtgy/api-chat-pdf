import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    return new NextResponse("Webhook Error: " + (err as Error)?.message, {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (!session.client_reference_id) {
      return new NextResponse("Client reference id not found.", {
        status: 400,
      });
    }

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await prismadb.subscription.create({
      data: {
        userId: session.client_reference_id,
        stripePriceId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice;
    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription as string
    );

    // Find subscription by customer ID instead
    const existingSubscription = await prismadb.subscription.findUnique({
      where: {
        stripeCustomerId: invoice.customer as string,
      },
    });

    if (!existingSubscription) {
      console.log("No subscription found for customer:", invoice.customer);
      return new NextResponse(null, { status: 200 });
    }

    // Update the existing subscription
    await prismadb.subscription.update({
      where: {
        id: existingSubscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });

    console.log(
      "Successfully updated subscription for customer:",
      invoice.customer
    );
  }

  return new NextResponse(null, { status: 200 });
}
