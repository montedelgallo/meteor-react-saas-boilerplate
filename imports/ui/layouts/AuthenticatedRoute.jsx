import React from 'react';
import { Route, Redirect } from 'wouter';
import AuthLayout from './AuthLayout';
import { useTracker } from 'meteor/react-meteor-data'; 

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useTracker(() => Meteor.userId());

  return (
    <Route
      {...rest}
    >
      {
        isAuthenticated ? (
          <AuthLayout>
            <Component {...rest} />
          </AuthLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    </Route>

  );
};

export default AuthenticatedRoute;