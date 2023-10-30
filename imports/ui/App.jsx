import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import EmailVerification from './components/EmailVerification';
import PricingPage from './publicPages/Pricing';
import Register from './publicPages/Register';
import { Route, Switch } from "wouter";
import Logout from './pages/logout';
import Root from './pages/root';
import PaymentSuccess from './pages/paymentSuccess';
import PaymentCancel from './pages/paymentCancel';
import Login from './publicPages/Login';
import NavBar from './components/NavBar';
import UnauthenticatedRoute from './layouts/UnauthenticatedRoute';
import AuthenticatedRoute from './layouts/AuthenticatedRoute';
import Dashboard from './pages/dashboard';


export const App = () => {
  const user = useTracker(() => Meteor.user());
  const userId = useTracker(() => Meteor.userId());

  console.log(userId)
  // const router = createRouterCustom(user);


  return (
    <main>
      <Switch>
        <AuthenticatedRoute exact path="/" component={Dashboard} />
        <UnauthenticatedRoute exact path="/login" component={Login} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/register" component={Register} />
        <Route path="/verify-email/:token" component={EmailVerification} />
        <Route path="/payment/success" component={PaymentSuccess} />
        <Route path="/payment/cancelled" component={PaymentCancel} />
        <AuthenticatedRoute path="/dashboard" component={Dashboard} />

        {/* App Routes */}
        <Route exact path="/" component={Root}>
          <Switch>
            <Route exact path="/" component={Logout} />
            <Route path="/pricing" component={PricingPage} />
          </Switch>
        </Route>
      </Switch>
    </main>
  )
};
