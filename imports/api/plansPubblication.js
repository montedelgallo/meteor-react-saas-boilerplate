import { Meteor } from 'meteor/meteor';
import { PlansCollection } from '/imports/db/PlansCollection';

Meteor.publish('plans', function publishPlans() {
  return PlansCollection.find({});
});