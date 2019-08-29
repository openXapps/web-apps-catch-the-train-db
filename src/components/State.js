import React from 'react';

const State = (props) => {
  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      <h4>States / Provinces</h4>
      <p>Country ID: {props.match.params.id}</p>
    </div>
  );
};

export default State;
