import { Meteor } from 'meteor/meteor';
import express from 'express'
import { WebApp } from 'meteor/webapp'
import { LinksCollection } from '/imports/api/links';
import { TasksCollection } from '/imports/api/TasksCollection';

const SEED_USERNAME = 'admin';
const SEED_PASSWORD = 'password';

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

const insertTask = taskText => TasksCollection.insert({ text: taskText });


Meteor.startup(async () => {
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

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  Accounts.onCreateUser((options, user) => {
    // create stripe customer
    // ...

    // create an apikey by default
    // ...

    // Don't forget to return the new user object at the end!
    return user;
  });

  const app = express()
  app.get('/hello', (req, res) => {
    const links = LinksCollection.find({}).fetch()
    res.status(200).json(links)
  })

  WebApp.connectHandlers.use('/api', Meteor.bindEnvironment(app))


  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });
});
