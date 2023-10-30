import React from 'react';
import { Link } from "wouter";
import { LoginForm } from '../components/LoginForm';

export default Register = () => {
  return (
    <div className="row g-0 app-auth-wrapper">
      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
        <div className="d-flex flex-column align-content-end">
          <div className="app-auth-body mx-auto">
            <div className="app-auth-branding mb-4"><a className="app-logo" href="index.html"><img className="logo-icon me-2" src="assets/images/app-logo.svg" alt="logo" /></a></div>
            <h2 className="auth-heading text-center mb-4">Login</h2>
            <div className="auth-form-container text-start mx-auto">
              <LoginForm />
              <div className="auth-option text-center pt-5">Don't have an account yet? <Link to="/register">Register</Link></div>
            </div>
          </div>
          <footer className="app-auth-footer">
            <div className="container text-center py-3">

            </div>
          </footer>
        </div>
      </div>
      <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
        <div className="auth-background-holder">
        </div>
        <div className="auth-background-mask"></div>
        <div className="auth-background-overlay p-3 p-lg-5">
          <div className="d-flex flex-column align-content-end h-100">
            <div className="h-100"></div>
            <div className="overlay-content p-3 p-lg-4 rounded">
              <h5 className="mb-3 overlay-title">Explore Portal Admin Template</h5>
              <div>Portal is a free Bootstrap 5 admin dashboard template. You can download and view the template license <a href="https://themes.3rdwavemedia.com/bootstrap-templates/admin-dashboard/portal-free-bootstrap-admin-dashboard-template-for-developers/">here</a>.</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};