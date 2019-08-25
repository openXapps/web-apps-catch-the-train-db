import React from 'react';
import useAuth from '../hooks/useAuth';

const Content = () => {
  const auth = useAuth();
  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      <h4>Content</h4>
      {auth.isSignedIn ? (
        <p>{`Hello ${auth.user.email}`}</p>
      ) : (
          <p>You not signed in!</p>
        )}
    </div>
  );
};

export default Content;
