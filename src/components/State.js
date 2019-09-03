import React from 'react';
import { Link } from 'react-router-dom';
import useFirebase from '../context/Firebase';

const State = (props) => {
  const firebase = useFirebase();
  const [states, setStates] = React.useState([{ id: '', data: {} }]);
  const uid = props.match.params.uid;

  React.useEffect(() => {
    uid && firebase.db.collection('state')
      .get()
      .then((querySnapshot) => {
        setStates(() => {
          let x = [];
          querySnapshot.forEach((doc) => {
            x.push({ id: doc.id, data: doc.data() });
          });
          return x;
        });
      })
      .catch((error) => {
        console.log("State: Error getting documents: ", error);
      });
    return () => {
      console.log('State: Effect clean-up...');
    };
  }, [uid, firebase.db])

  console.log('State: states...', states);

  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      <h4>States / Provinces</h4>
      <p>User ID: {props.match.params.uid}</p>
      <p>Country ID: {props.match.params.id}</p>
      {states.length > 0 ? (
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="gd-cttdb-mnu-state"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Select a State</button>
          <div className="dropdown-menu" aria-labelledby="gd-cttdb-mnu-state">
            {states.map((state, index) => {
              return (
                <Link
                  className="dropdown-item"
                  to={encodeURI(`/station/${uid}/${state.id}`)}
                  key={index}
                >{state.data.name}</Link>
              );
            })}
            <Link className="dropdown-item" to="/">North West</Link>
            <Link className="dropdown-item" to="/">Free State</Link>
          </div>
        </div>
      ) : (
          <div>Loading countries...</div>
        )}
    </div>
  );
};

export default State;
