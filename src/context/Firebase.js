import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/**
 * Setup Firebase configuration
 * web-apps-catch-the-train
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

/**
 * Setup React Context API
 */
const FirebaseContext = React.createContext();

/**
 * Initialize Firebase application
 */
app.initializeApp(firebaseConfig);
const auth = app.auth();

/**
 * Firebase state defaults
 */
const userDefault = null;
const authIsBusyDefault = false;
const authIsSignedInDefault = false;
const authIsErrorDefault = { state: false, error: '' };

/**
 * Firebase state and method management Hook
 */
const useFirebaseProvider = () => {
  const [user, setUser] = React.useState(userDefault);
  const [authIsBusy, setAuthIsBusy] = React.useState(authIsBusyDefault);
  const [authIsSignedIn, setAuthIsSignedIn] = React.useState(authIsSignedInDefault);
  const [authIsError, setAuthIsError] = React.useState(authIsErrorDefault);
  const db = app.firestore(); 

  const signIn = (email, password) => {
    setAuthIsBusy(true);
    setAuthIsError(authIsErrorDefault);
    return auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        setAuthIsBusy(authIsBusyDefault);
        setUser(response.user);
        return response.user;
      })
      .catch((err) => {
        setAuthIsBusy(authIsBusyDefault);
        setAuthIsError({ ...authIsError, state: true, error: err.code })
      });
  };

  const signUp = (email, password) => {
    setAuthIsBusy(true);
    setAuthIsError(authIsErrorDefault);
    return auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        setAuthIsBusy(authIsBusyDefault);
        setUser(response.user);
        return response.user;
      })
      .catch((err) => {
        setAuthIsBusy(authIsBusyDefault);
        setAuthIsError({ ...authIsError, state: true, error: err.code })
      });;
  };

  const signOut = () => {
    setAuthIsBusy(true);
    setTimeout(() => {
      auth.signOut()
        .then(() => {
          setAuthIsBusy(authIsBusyDefault);
          setAuthIsSignedIn(authIsSignedInDefault);
          setUser(userDefault);
        });
    }, 1000);
  };

  const sendPasswordResetEmail = email => {
    setAuthIsBusy(true);
    auth.sendPasswordResetEmail(email)
      .then(() => {
        setAuthIsBusy(authIsBusyDefault);
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    setAuthIsBusy(true);
    auth.confirmPasswordReset(code, password)
      .then(() => {
        setAuthIsBusy(authIsBusyDefault);
        return true;
      });
  };

  /**
   * Magic subscription to Firebase Auth User state on mount.
   * Because this sets state in the callback it will cause any
   * component that utilizes this hook to re-render with the
   * latest auth state.
   */
  React.useEffect(() => {
    // Firebase auth subscription
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('useAuthProvider: user state...', user.email);
        setUser(user);
        setAuthIsSignedIn(true);
      } else {
        console.log('useAuthProvider: user state... Signed out!');
        setAuthIsSignedIn(authIsSignedInDefault);
        setUser(userDefault);
      }
    });
    // Cleanup subscription on unmount
    return () => {
      console.log('useAuthProvider: user state... Unsubscribed from FB Auth!');
      setAuthIsSignedIn(authIsSignedInDefault);
      unsubscribeAuth();
    };
    // Once-off effect!
  }, []);

  /**
   * Return state and wrapped methods
   */
  return {
    user,
    authState: {
      authIsBusy: authIsBusy,
      authIsSignedIn: authIsSignedIn,
      authIsError: authIsError
    },
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
    db
  };
};

/**
 * Contaxt provider component that wraps the App and
 * exposes Firebase to any child component that calls useFirebase() Hook.
 */
export const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={useFirebaseProvider()}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

/**
 * Hook for child components to get Firebase
 * and re-render when it changes.
 */
const useFirebase = () => {
  return React.useContext(FirebaseContext);
};

export default useFirebase;
