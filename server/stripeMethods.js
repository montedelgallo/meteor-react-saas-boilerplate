// Importing necessary libraries
import { Meteor } from 'meteor/meteor';
import { PlansCollection } from '/imports/db/PlansCollection';

import initStripe from 'stripe';

Meteor.startup(async () => {
  Meteor.call('stripe.getProducts');
})

// Registration method
Meteor.methods({
  'stripe.getProducts': async () => {
    const stripe = initStripe(Meteor.settings.private.stripe_secret);

    const {data} = await stripe.products.list();

    data.map(el => {
      // check if plan exists
      const plan = PlansCollection.findOne({ 'data.id': el.id });
      if (!plan) {
        PlansCollection.insert({ data: el });
      }
    })
  },
});