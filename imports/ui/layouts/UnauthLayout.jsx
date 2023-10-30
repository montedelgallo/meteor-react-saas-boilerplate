import React from 'react';

const UnauthLayout = ({ children }) => {
  return (
    <div>
      {/* You can put a header, etc. here */}
      <main>{children}</main>
      {/* You can put a footer, etc. here */}
    </div>
  );
};

export default UnauthLayout;
