import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../config/firebase';

// Add Firebase credentials
app.initializeApp(firebaseConfig);

// Default state
const userDefault = null;
const isBusyDefault = false;
const isSignedInDefault = false;
const isErrorDefault = { state: false, error: '' };

/**
 * Provider hook that creates auth object and handles state
 */
const useProvideAuth = () => {
  const [user, setUser] = React.useState(userDefault);
  const [isBusy, setIsBusy] = React.useState(isBusyDefault);
  const [isSignedIn, setIsSignedIn] = React.useState(isSignedInDefault);
  const [isError, setIsError] = React.useState(isErrorDefault);

  // Wrap any Firebase methods we want to use making sure
  // to save the user to state.
  const signIn = (email, password) => {
    setIsBusy(true);
    setIsError(isErrorDefault);
    return app.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        setIsBusy(isBusyDefault);
        setUser(response.user);
        return response.user;
      })
      .catch((err) => {
        setIsBusy(isBusyDefault);
        setIsError({ ...isError, state: true, error: err.code })
      });
  };

  const signUp = (email, password) => {
    setIsBusy(true);
    setIsError(isErrorDefault);
    return app.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        setIsBusy(isBusyDefault);
        setUser(response.user);
        return response.user;
      })
      .catch((err) => {
        setIsBusy(isBusyDefault);
        setIsError({ ...isError, state: true, error: err.code })
      });;
  };

  const signOut = () => {
    setIsBusy(true);
    setTimeout(() => {
      app.auth().signOut()
        .then(() => {
          setIsBusy(isBusyDefault);
          setIsSignedIn(isSignedInDefault);
          setUser(userDefault);
        });
    }, 1000);
  };

  const sendPasswordResetEmail = email => {
    setIsBusy(true);
    app.auth().sendPasswordResetEmail(email)
      .then(() => {
        setIsBusy(isBusyDefault);
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    setIsBusy(true);
    app.auth().confirmPasswordReset(code, password)
      .then(() => {
        setIsBusy(isBusyDefault);
        return true;
      });
  };

  // Magic subscription to Firebase Auth User object state on mount
  // Because this sets state in the callback it will cause any
  // component that utilizes this hook to re-render with the
  // latest auth object.
  React.useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('useAuthProvider: user state...', user.email);
        setUser(user);
        setIsSignedIn(true);
      } else {
        console.log('useAuthProvider: user state... Signed out!');
        setIsSignedIn(isSignedInDefault);
        setUser(userDefault);
      }
    });
    // Cleanup subscription on unmount
    return () => {
      console.log('useAuthProvider: user state... Unsubscribed from FB Auth!');
      setIsSignedIn(isSignedInDefault);
      unsubscribe();
    };
    // Once-off effect!
  }, []);

  // Return state and auth methods
  return {
    user,
    isBusy,
    isSignedIn,
    isError,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
};

export default useProvideAuth;