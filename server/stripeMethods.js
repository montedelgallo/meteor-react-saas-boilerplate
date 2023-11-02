// Importing necessary libraries
import { Meteor } from 'meteor/meteor';
import { PlansCollection } from '/imports/db/PlansCollection';
import { Teams } from '/imports/db/TeamsCollection';

import initStripe from 'stripe';

Meteor.startup(async () => {
  Meteor.call('stripe.getProducts');
})

// Registration method
Meteor.methods({

  'stripe.getCheckoutSession': async (userId, priceId, current_team = null) => {
    const stripe = initStripe(Meteor.settings.private.stripe_secret);
    const lineItems = [
      {
        price: priceId,
        quantity: 1,
      },
    ];

    let team

    if (current_team == null) {
      const uTeams = Teams.find({ ownerId: userId }).fetch();
      team = uTeams[0]
    } else {
      team = current_team
    }

    const session = await stripe.checkout.sessions.create({
      customer: team.stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: "http://localhost:3000/payment/success",
      cancel_url: "http://localhost:3000/payment/cancelled",
    });

    return session.id;
  },

  'stripe.getAllProducts': async () => {
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

    return plans
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

  'stripe.customerPortal': async (userId, current_team = null) => {
    const stripe = initStripe(Meteor.settings.private.stripe_secret);

    let team

    if (current_team == null) {
      const uTeams = Teams.find({ ownerId: userId }).fetch();
      team = uTeams[0]
    } else {
      team = current_team
    }

    const session = stripe.billingPortal.sessions.create({
      customer: team.stripeCustomerId,
      return_url: 'http://localhost:3000'
    })

    return session
  }
});