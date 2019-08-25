import React from 'react';
import useAuth from '../hooks/useAuth';

const userDefault = {
  email: 'gavin.dalton@standardbank.co.za',
  password: 'password123'
};

const Login = () => {
  const auth = useAuth();
  const [user, setUser] = React.useState(userDefault);

  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      <h4>Login</h4>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            auth.signIn(user.email, user.password);
          }}
          disabled={auth.isSignedIn || auth.isBusy}
        >Sign In</button>
      </form>
    </div>
  );
};

export default Login;
