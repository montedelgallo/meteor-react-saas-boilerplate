import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import EmailVerification from './components/EmailVerification';
import PricingPage from './publicPages/Pricing';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Logout from './pages/logout';
import Root from './pages/root';

const createRouterCustom = (user) => {
  const publicRoutes = createBrowserRouter([
    {
      path: "/",
      element: <LoginForm />,
    },
    {
      path: "/pricing",
      element: <PricingPage />,
    },
    {
      path: "/register",
      element: <RegistrationForm />,
    },
    {
      path: "/verify-email/:token",
      element: <EmailVerification />,
    }
  ]);

  const appRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Logout />,
        },
        {
          path: "/pricing",
          element: <PricingPage />,
        },
      ],
    }
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
