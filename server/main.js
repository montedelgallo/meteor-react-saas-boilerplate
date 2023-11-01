import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp'
import crypto from 'crypto';
import { LinksCollection } from '/imports/api/links';
import { TasksCollection } from '/imports/db/TasksCollection';
import initStripe from 'stripe';
import app from '/imports/express/server'
import '/imports/api/tasksMethods';
import '/imports/api/plansPubblication';
import './userMethods';
import './stripeMethods';
import './stripeWebhooks';
import { Teams } from '../imports/db/TeamsCollection';
import { Random } from 'meteor/random'


const SEED_USERNAME = 'admin@admin.com';
const SEED_PASSWORD = 'password';

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

const insertTask = taskText => TasksCollection.insert({ text: taskText });


Meteor.startup(async () => {

  // process.env.ROOT_URL = 'https://2f99-109-112-78-64.ngrok-free.app';


  // If the Links collection is empty, add some data.
  // if (await LinksCollection.find().countAsync() === 0) {
  //   await insertLink({
  //     title: 'Do the Tutorial',
  //     url: 'https://www.meteor.com/tutorials/react/creating-an-app',
  //   });

  //   await insertLink({
  //     title: 'Follow the Guide',
  //     url: 'https://guide.meteor.com',
  //   });

  //   await insertLink({
  //     title: 'Read the Docs',
  //     url: 'https://docs.meteor.com',
  //   });

  //   await insertLink({
  //     title: 'Discussions',
  //     url: 'https://forums.meteor.com',
  //   });
  // }

  // if (TasksCollection.find().count() === 0) {
  //   [
  //     'First Task',
  //     'Second Task',
  //     'Third Task',
  //     'Fourth Task',
  //     'Fifth Task',
  //     'Sixth Task',
  //     'Seventh Task'
  //   ].forEach(insertTask)
  // }

  // Configuring the Accounts email templates
  Accounts.emailTemplates.siteName = 'YourSiteName';
  Accounts.emailTemplates.from = 'YourSiteName <no-reply@yoursite.com>';

  // Configuring the email verification template
  Accounts.emailTemplates.verifyEmail = {
    subject() {
      return 'Verify Your Email Address';
    },
    text(user, url) {
      const newUrl = url.replace('/#/', '/');
      // Providing instructions to verify email
      return `Hello ${user.emails[0].address},\n\nPlease verify your email address by clicking the link below:\n\n${newUrl}\n\nThank you.`;
    },
  };

  Accounts.emailTemplates.resetPassword.subject = (user) => {
    return "Reset your password on YourApp";
  };
  Accounts.emailTemplates.resetPassword.text = (user, url) => {
    return `Hello,
    To reset your password, simply click the link below.
    ${url}
    Thanks,
    YourApp team
    `;
  };

  Accounts.onCreateUser(async (options, user) => {

    const stripe = initStripe(Meteor.settings.private.stripe_secret);

    console.log(user)

    try {
      const email = user.emails[0].address
      const teamName = `${email.split('@')[0]}'s Personal Space`;
      
      // create an apikey by default
      user.apikeys = [
        {
          "name": "default",
          "key": crypto.randomBytes(32).toString('hex'),
        }
      ]

      const userId = Random.id();

      user._id = userId;

      // TODO: By default create a team with email's personal space
      // const teamId = await Meteor.callAsync('teams.create', user.emails[0].address);
      // console.log('team', team);
      user.profile = options.profile ? options.profile : {};
      
      const customer = await stripe.customers.create({
        name: teamName,
        email: email
      });
      
      const team = await Teams.insert({ name: teamName, ownerId: userId, stripeCustomerId: customer.id });
      console.log('team', team);
      // Don't forget to return the new user object at the end!
      return user;
    } catch (error) {
      console.log(error)
      throw new Meteor.Error('stripe-error', 'Failed to create Stripe customer');
    }
  });

  if (!Accounts.findUserByEmail(SEED_USERNAME)) {
    Accounts.createUser({
      email: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  WebApp.connectHandlers.use('/api', Meteor.bindEnvironment(app))


  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });
});
