import React from "react";
import { Meteor } from 'meteor/meteor';

export default PricingPage = () => {

  const getPricing = async () => {
    const pricing = await Meteor.callAsync('stripe.getProducts')
    console.log(pricing)
  }

  getPricing()

  return (
    <div>
      <h1>Pricing</h1>
      <p>Here is the pricing page</p>
    </div>
  )
}

// 