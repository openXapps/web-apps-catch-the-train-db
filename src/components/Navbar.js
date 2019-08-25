import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = (props) => {
  const auth = useAuth();
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-light navbar-light px-2">
        <Link className="btn btn-secondary" to="/">Home</Link>
        <span className="navbar-text text-dark h5 ml-sm-2 mb-0">Firebase Auth Template</span>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        ><span className="navbar-toggler-icon"></span></button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <form className="form-inline ml-auto">
            {auth.isSignedIn ? (
              <button
                className="btn btn-success btn-block mt-sm-0 mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  auth.signOut();
                }}
                disabled={auth.isBusy}
              >Sign Out</button>
            ) : (
                <Link
                  className="btn btn-secondary btn-block mt-sm-0 mt-2"
                  to="/login"
                  disabled={auth.isBusy}
                >Sign In</Link>
              )}
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
