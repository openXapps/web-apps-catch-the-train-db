import React from 'react';
// import useAuth from '../hooks/useAuth';
import useFirebase from '../context/Firebase';
import Country from './Country';

const Content = () => {
  const { user, authState} = useFirebase();

  // console.log('Content: user...', user);

  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      <h4>Content</h4>
      {authState.authIsSignedIn ? (
        <>
          <p>{`Hello ${user.email}`}</p>
          <Country uid={user.uid}/>
        </>
      ) : (
          <p>You not signed in!</p>
        )}
    </div>
  );
};

export default Content;
