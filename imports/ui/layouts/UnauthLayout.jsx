import React, {useEffect} from 'react';

const UnauthLayout = ({ children }) => {

  useEffect(() => {
    // Add the class when the component mounts
    document.getElementById('react-target').classList.remove('app');

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.add('app');
    };
  }, []);

  return (
    <div>
      {/* You can put a header, etc. here */}
      <main>{children}</main>
      {/* You can put a footer, etc. here */}
    </div>
  );
};

export default UnauthLayout;
