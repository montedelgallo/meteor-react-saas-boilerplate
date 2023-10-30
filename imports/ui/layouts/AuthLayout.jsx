import React from 'react';
import Header from '../shared/Header';

const AuthLayout = ({ children }) => {
  return (
    <>
      {/* You can put a header, sidebar, etc. here */}
      <Header />
      <main className='app-wrapper'>
        <div class="app-content pt-3 p-md-3 p-lg-4">
          {children}
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
