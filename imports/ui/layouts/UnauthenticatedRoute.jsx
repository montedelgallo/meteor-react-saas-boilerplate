import React from 'react';
import { Route, Redirect } from 'wouter';
import UnauthLayout from './UnauthLayout';
import { useTracker } from 'meteor/react-meteor-data';

const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useTracker(() => Meteor.userId());

  console.log('isAuthenticated', isAuthenticated)
  console.log(!isAuthenticated ? 'Unauthenticated' : 'Authenticated')

  return (
    <Route
      {...rest}
    >
      {
        !isAuthenticated ? (
          <UnauthLayout>
            <Component {...rest} />
          </UnauthLayout>
        ) : (
          <Redirect to="/" />
        )
      }
    </Route> 
    
  );
};

export default UnauthenticatedRoute;
