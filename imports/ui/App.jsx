import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();


  return (
    <div className="main">
      {user ? (
        <Fragment>
          <h1>Ciao</h1>
          <div className="user" onClick={logout}>
            {user.username} 🚪
          </div>
        </Fragment>
      ) : (
        <LoginForm />
      )}
    </div>
  )
};
