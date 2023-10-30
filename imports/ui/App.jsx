import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import EmailVerification from './components/EmailVerification';
import PricingPage from './publicPages/Pricing';
import Register from './publicPages/Register';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Logout from './pages/logout';
import Root from './pages/root';
import PaymentSuccess from './pages/paymentSuccess';
import PaymentCancel from './pages/paymentCancel';
import Login from './publicPages/Login';
import NavBar from './components/NavBar';

const createRouterCustom = (user) => {
  const publicRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/pricing",
      element: <PricingPage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/verify-email/:token",
      element: <EmailVerification />,
    },
    {
      path: "/payment/success",
      element: <PaymentSuccess />,
    },
    {
      path: "/payment/cancelled",
      element: <PaymentCancel />,
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
    },
    {
      path: "/payment/success",
      element: <PaymentSuccess />,
    },
    {
      path: "/payment/cancelled",
      element: <PaymentCancel />,
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
    <>
    <NavBar />
    <RouterProvider router={router} />
    </>
  )
};
