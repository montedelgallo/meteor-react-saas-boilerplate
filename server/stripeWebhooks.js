import stripe from "stripe";
import { Meteor } from "meteor/meteor";

const bound = Meteor.bindEnvironment(callback => callback());


// endpoint bis in caso express non vada
WebApp.rawConnectHandlers.use("/stripe-webhook", (req, res, next) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = Meteor.settings.STRIPE_WEBHOOK_SK;
  const stripeObj = stripe(Meteor.settings.STRIPE_SK);
  if (req.method === "POST") {
    let body = "";
    req.on("data", data => bound(() => {
      body += data;
    }));
    req.on("end", () => bound(() => {
      try {
        // const eventObj = stripeObj.webhooks.constructEvent(body, sig, endpointSecret);
        // const eventData = eventObj.data;
        // const result = invokeStripeEvent(eventObj, eventData.object);
        // res.writeHead(200);
        // res.end(result);
        res.end("ok");
      }
      catch (error) {
        res.writeHead(500);
        console.warn("[Payment Gateway Exception]: ", error);
        if (error.type && error.type === "StripeSignatureVerificationError") {
          res.end("We caught you -_-");
        }
        else {
          res.end(JSON.stringify(error, Object.getOwnPropertyNames(error)));
        }
      }
    }));
  }
  else {
    next();
  }
});