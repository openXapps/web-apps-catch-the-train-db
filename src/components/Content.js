import React from 'react';
// import useAuth from '../hooks/useAuth';
import useFirebase from '../context/Firebase';

const Content = () => {
  const { user, authState, db } = useFirebase();

  // React.useEffect(() => {
  //   const countryRef = db
  //     .collection('country')
  //     .
  //   return () => {};
  // });

  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      <h4>Content</h4>
      {authState.authIsSignedIn ? (
        <p>{`Hello ${user.email}`}</p>
      ) : (
          <p>You not signed in!</p>
        )}
    </div>
  );
};

export default Content;
