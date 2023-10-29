import { Outlet } from "react-router-dom";
import React, { useState, Fragment, useEffect } from 'react';


export default function Root() {
  return (
    <>
      {/* all the other elements */}
      <div id="detail">
        
        <Outlet />
      </div>
    </>
  );
}