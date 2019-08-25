import React from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Hook for child components to get the auth object
 * and re-render when it changes.
 */
const useAuth = () => {
  return React.useContext(AuthContext);
};

export default useAuth;

/**
 * 1. Any child component under App can import this hook.
 * 2. Once a child uses this hook, then:
 * 2.1 The child gets access to AuthContext which is provided by AuthProvider.
 * 2.2 AuthProvider wraps the child and passes useAuthProvider hook as a value prop.
 * 2.3 The child can access Firebase Auth User state and methods provided by useAuthProvider hook.
 */