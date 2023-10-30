import { Outlet } from "react-router-dom";
import React, { useState, Fragment, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function AuthRoot() {
  const { isAuthenticated, authenticateUser, signOut, email } = useContext(AuthContext);


  return (
    <>
        <div id="detail">
          {isAuthenticated ? <h1>Authenticated</h1> : <h1>Not Authenticated</h1>}
          <Outlet />
        </div>

    </>
  );
}