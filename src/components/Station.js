import React from 'react';

const Station = (props) => {
  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      <h4>Station</h4>
      <p>User ID: {props.match.params.uid}</p>
      <p>State ID: {props.match.params.id}</p>
    </div>
  );
};

export default Station;
