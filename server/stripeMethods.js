// Importing necessary libraries
import { Meteor } from 'meteor/meteor';
import { PlansCollection } from '/imports/db/PlansCollection';

import initStripe from 'stripe';

Meteor.startup(async () => {
  Meteor.call('stripe.getProducts');
})

// Registration method
Meteor.methods({

  'stripe.getCheckoutSession': async (user, priceId) => {
    const stripe = initStripe(Meteor.settings.private.stripe_secret);
    const lineItems = [
      {
        price: priceId,
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      customer: user.stripeCustomer,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: "http://localhost:3000/payment/success",
      cancel_url: "http://localhost:3000/payment/cancelled",
    });

    return session.id;
  },

  'stripe.getProducts': async () => {
    const stripe = initStripe(Meteor.settings.private.stripe_secret);

    // const {data} = await stripe.products.list();

    const { data: prices } = await stripe.prices.list();

    const plans = await Promise.all(
      prices.map(async (price) => {
        const product = await stripe.products.retrieve(price.product);
        return {
          id: price.id,
          name: product.name,
          price: price.unit_amount,
          interval: price.recurring.interval,
          currency: price.currency,
        };
      })
    );

    const sortedPlans = plans.sort((a, b) => a.price - b.price);

    sortedPlans.map(el => {
      // check if plan exists
      const plan = PlansCollection.findOne({ 'data.id': el.id });
      if (!plan) {
        // PlansCollection.insert({ data: el });
        PlansCollection.insert({ data: el });
      }
    })
  },
});