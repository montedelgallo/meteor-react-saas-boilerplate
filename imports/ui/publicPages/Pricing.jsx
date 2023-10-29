import React from "react";
import { Meteor } from 'meteor/meteor';
import { PlansCollection } from "../../db/PlansCollection";
import { useTracker } from 'meteor/react-meteor-data';

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

  console.log(plans)

  return (
    <div>
      <h1>Pricing</h1>
      <p>Here is the pricing page</p>
    </div>
  )
}

// 