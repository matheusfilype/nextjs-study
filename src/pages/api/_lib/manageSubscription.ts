import { query } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";
import { User } from "../subscribe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  // Refactor
  const userRef = await fauna.query<User>(
    query.Get(
      query.Match(
        query.Index("user_by_stripe_customer_id"),
        query.Casefold(customerId)
      )
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef.ref.id,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  await fauna.query(
    query.Create(query.Collection("subscriptions"), { data: subscriptionData })
  );
}
