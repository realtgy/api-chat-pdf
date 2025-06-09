import { auth } from "@clerk/nextjs";
import prismadb from "./prisma";
import { stripe } from "./stripe";

export const isValidSubscription = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }

  const subscription = await prismadb.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripePriceId: true,
    },
  });

  if (!subscription) {
    return false;
  }

  const isValid =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd?.getTime()! > Date.now();

  return !!isValid;
};

export const generateBillingLink = async () => {
  const defaultUrl = process.env.BASE_URL;

  const { userId } = auth();
  if (!userId) {
    return false;
  }

  const subscription = await prismadb.subscription.findUnique({
    where: {
      userId,
    },
  });

  if (subscription && subscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: defaultUrl,
    });

    return stripeSession.url;
  }
};

const MAX_FREE_DOCS = 1;
export const isMaxFreeDocuments = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }

  const documents = await prismadb.document.findMany({
    where: {
      userId,
    },
  });

  if (documents.length >= MAX_FREE_DOCS) return true;
  else return false;
};

export const needToUpgrade = async () => {
  const isSubsribed = await isValidSubscription();
  const reachedFreeQuota = await isMaxFreeDocuments();

  if (!isSubsribed && reachedFreeQuota) return true;
  else return false;
};
