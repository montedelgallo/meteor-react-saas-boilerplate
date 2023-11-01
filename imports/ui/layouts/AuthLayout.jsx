import React, { useEffect } from 'react'; 
import Header from '../shared/Header';

const AuthLayout = ({ children }) => {

  useEffect(() => {
    // Add the class when the component mounts
    document.getElementById('react-target').classList.add('app');

    // Remove the class when the component unmounts
    return () => {
      document.getElementById('react-target').classList.remove('app');
    };
  }, []);

  return (
    <div>
      {/* You can put a header, sidebar, etc. here */}
      <Header />
      <main className='app-wrapper'>
        <div class="app-content pt-3 p-md-3 p-lg-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
