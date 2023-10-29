import express from 'express'
import { Meteor } from 'meteor/meteor'

const app = express()


// Adding a middleware to handle Meteor user authentication
app.use((req, res, next) => {
  // Getting the Meteor login token from the request headers
  const meteorLoginToken = req.headers['meteor-login-token'];

  // Checking if the Meteor login token exists
  if (meteorLoginToken) {
    // Finding the user by the login token
    const hashedToken = Accounts._hashLoginToken(meteorLoginToken);
    const user = Meteor.users.findOne({ 'services.resume.loginTokens.hashedToken': hashedToken });

    // Attaching the user to the request object
    req.user = user;
  }

  next();  // Proceeding to the next middleware or route handler
});

app.get('/hello', (req, res) => {
  const links = LinksCollection.find({}).fetch()
  res.status(200).json(links)
})

app.get('/subscribe/:planId', async (req, res) => {
  // get localstorage value
  
})

export default app