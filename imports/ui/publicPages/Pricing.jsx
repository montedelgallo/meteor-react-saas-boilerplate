import React from "react";
import { Meteor } from 'meteor/meteor';
import { PlansCollection } from "../../db/PlansCollection";
import { useTracker } from 'meteor/react-meteor-data';
import { loadStripe } from "@stripe/stripe-js";
import PricingPlan from "../components/PricingPlan";


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
      <section id="pricing" className="py-4 py-lg-6 bg-white ">

        <div className="container-xxl" >
          <div className="row justify-content-center mb-4">
            <div className="col-xl-10">
              <div className="lc-block d-grid justify-content-center gap-2 mb-3" >
                <svg className="  ms-4" xmlns="http://www.w3.org/2000/svg" width="300" height="8" viewBox="0 0 312 11" fill="none">
                  <path d="M0 5.5C0 2.46243 2.46243 0 5.5 0H306.5C309.538 0 312 2.46243 312 5.5C312 8.53757 309.538 11 306.5 11H5.5C2.46243 11 0 8.53757 0 5.5Z" fill="url(#paint0_linear_6_1107)"></path>
                  <defs>
                    <linearGradient id="paint0_linear_6_1107" x1="-42.9796" y1="0" x2="384.163" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#F4F8FA"></stop>
                      <stop offset="0.463542" stop-color="#9DF6B2" stop-opacity="0"></stop>
                      <stop offset="1" stop-color="#63307D"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <svg className="  ms-n4 " xmlns="http://www.w3.org/2000/svg" width="300" height="8" viewBox="0 0 312 11" fill="none">
                  <path d="M0 5.5C0 2.46243 2.46243 0 5.5 0H306.5C309.538 0 312 2.46243 312 5.5C312 8.53757 309.538 11 306.5 11H5.5C2.46243 11 0 8.53757 0 5.5Z" fill="url(#paint0_linear_6_1107)"></path>
                  <defs>
                    <linearGradient id="paint0_linear_6_1107" x1="-42.9796" y1="0" x2="384.163" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#F4F8FA"></stop>
                      <stop offset="0.463542" stop-color="#9DF6B2" stop-opacity="0"></stop>
                      <stop offset="1" stop-color="#63307D"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="lc-block mb-4 text-center">
                <p className="lead mb-0">Flexible Options to Fit Your Budget and Goals</p>
                <div>
                  <h2 className="display-3 fw-bolder ls-n1">Pricing Plans</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="lc-block d-flex flex-wrap justify-content-center mb-5">
            {plans.map(plan => (
              <PricingPlan plan={plan}/>
            ))}
            
          </div>
          <div className="row justify-content-lg-end">
            <div className="col" >
              <div className="card">
                <div className="card-body">

                  <div className="text-end">
                    <p className="badge bg-primary text-dark-700">UPCOMING</p>
                  </div>
                  <h3 className="h5 mb-3 fw-light mt-md-n3">Upcoming Features included in Agency and Enterprise plans:</h3>

                  <div className="vstack gap-2">
                    <div>
                      
                        <p className="d-inline mb-0"><strong>Smart Linking System</strong></p>
                    </div>
                    <div>
                      
                        <p className="d-inline mb-0"><strong> A.I. Content Generation​</strong></p>
                    </div>
                    <div>
                      
                        <p className="d-inline mb-0"><strong>A.I. Picture Generation</strong></p>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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