import React from 'react';
// import useAuth from '../hooks/useAuth';
import useFirebase from '../context/Firebase';

const userDefault = {
  email: process.env.REACT_APP_EMAIL,
  password: process.env.REACT_APP_PW
};

const Login = (props) => {
  const firebase = useFirebase();
  const [user, setUser] = React.useState(userDefault);

  React.useEffect(() => {
    firebase.authState.authIsSignedIn && props.history.goBack();
    return () => {
      console.log('Login: Effect clean-up...');
    };
  }, [firebase.authState.authIsSignedIn, props.history])

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
            firebase.signIn(user.email, user.password);
          }}
          disabled={firebase.authState.authIsSignedIn || firebase.authState.authIsBusy}
        >Sign In</button>
      </form>
    </div>
  );
};

export default Login;
