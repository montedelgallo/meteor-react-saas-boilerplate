import React from "react";
import { Meteor } from 'meteor/meteor';
import { PlansCollection } from "../../db/PlansCollection";
import { useTracker } from 'meteor/react-meteor-data';
import { loadStripe } from "@stripe/stripe-js";


export default PricingPage = () => {

  const { plans, pendingPlan, isLoading } = useTracker(() => {
    const noDataAvailable = { plans: [], pendingPlan: 0 };

    const handler = Meteor.subscribe('plans');

    if (!handler.ready()) {
      console.log('loading plans')
      return { ...noDataAvailable, isLoading: true };
    }

    const plans = PlansCollection.find({}).fetch();


    return { plans };
  })

  const subscripeToPlan = (planId) => {
    Meteor.call('stripe.getCheckoutSession', Meteor.user(), planId, async (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        const stripe = await loadStripe(Meteor.settings.public.stripe_publishable);
        await stripe.redirectToCheckout({ sessionId: result });
      }
    })
  }

  return (
    <div>
      <h1>Pricing</h1>
      <p>Here is the pricing page</p>

      <ul>
        {plans.map(plan => (
          <li key={plan._id}>
            <h2>{plan.data.name}</h2>
            <p>{plan.description}</p>
            <p>{plan.data.price}</p>
            <button
              onClick={() => {
                subscripeToPlan(plan.data.id)
              }}
            >Vai</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// 