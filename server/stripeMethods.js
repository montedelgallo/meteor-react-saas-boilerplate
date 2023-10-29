// Importing necessary libraries
import { Meteor } from 'meteor/meteor';
import initStripe from 'stripe';

// Registration method
Meteor.methods({
  'stripe.getProducts': async () => {
    const stripe = initStripe(Meteor.settings.private.stripe_secret);

    const {data} = await stripe.prices.list();

    return data
  },
});