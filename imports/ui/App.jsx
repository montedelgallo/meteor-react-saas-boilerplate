import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './components/LoginForm';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const createRouterCustom = (user) => {
  const publicRoutes = createBrowserRouter([
    {
      path: "/",
      element: <LoginForm />,
    },
  ]);

  const appRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Fragment>
        <h1>Ciao</h1>
        <div className="user" onClick={() => Meteor.logout()}>
          🚪 {user?.username}
        </div>
      </Fragment>,
    },
  ]);

  if (user) {
    return appRoutes;
  } else {
    return publicRoutes;
  }
}



export const App = () => {
  const user = useTracker(() => Meteor.user());

  const router = createRouterCustom(user);

  console.log(user)

  return (
    <RouterProvider router={router} />
  )
};
