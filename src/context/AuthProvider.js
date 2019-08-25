import React from 'react';
import AuthContext from './AuthContext';

// Custom hook that provides Firebase Auth
import useAuthProvider from '../hooks/useAuthProvider';

/**
 * Provider component that wraps the App and makes auth object
 * available to any child component that calls useAuth().
 */
const AuthProvider = (props) => {
  const auth = useAuthProvider();
  return (
    <AuthContext.Provider value={auth}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
