// withAuthorization.js
import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuthorization = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      // Assume `isAuthorized` determines if the user is authorized
      const isAuthorized = checkUserAuthorization();
      if (!isAuthorized) {
        return <Redirect to="/login" />;
      }
      return <WrappedComponent {...this.props} />;
    }
  }
};

// Assume this function checks user's authorization status
function checkUserAuthorization() {
  // Replace with your authorization checking logic
  return true;
}

export default withAuthorization;


/*
import React from 'react';
import withAuthorization from './withAuthorization';

const AdminLayoutComponent = ({ children }) => (
  <div>
    <header>Admin Header</header>
    <main>{children}</main>
    <footer>Admin Footer</footer>
  </div>
);

const AdminLayout = withAuthorization(AdminLayoutComponent);

export { AdminLayout };

*/