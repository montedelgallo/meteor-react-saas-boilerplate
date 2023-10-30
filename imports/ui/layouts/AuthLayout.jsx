import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div>
      {/* You can put a header, sidebar, etc. here */}
      <header>Authenticated Header</header>
      <main>{children}</main>
      {/* You can put a footer, etc. here */}
    </div>
  );
};

export default AuthLayout;
