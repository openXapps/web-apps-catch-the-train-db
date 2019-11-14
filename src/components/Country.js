import React from 'react';
import { Link } from 'react-router-dom';
import useFirebase from '../context/Firebase';
import { countrySchema } from '../config/schemas';

// https://firebase.google.com/docs/reference/js/firebase.firestore

const Country = (props) => {
  const { authState, db } = useFirebase();
  // const [uid, setUid] = React.useState('123');
  const [country, setCountry] = React.useState(countrySchema);

  React.useEffect(() => {
    // setUid(() => { return props.match.params.uid });
    if (authState.authIsSignedIn) {
      db.collection('country').doc(props.match.params.id)
        .get()
        .then((snapshot) => {
          // console.log('Country: snapshot...', snapshot);
          setTimeout(() => {
            setCountry(() => {
              return {
                name: snapshot.get('name'),
                iso: snapshot.get('iso'),
                enabled: snapshot.get('enabled'),
                modifiedBy: snapshot.get('modifiedBy') || props.match.params.uid,
                modifiedDate: snapshot.get('modifiedDate') || new Date()
              };
            });
          }, 500);
        })
        .catch((error) => {
          console.log("Country: Error getting document: ", error);
        });
    }
    // Effect cleanup
    return () => {
      // console.log('Country: Effect clean-up...');
    };
  }, [props.match.params.uid, props.match.params.id, db, authState.authIsSignedIn])

  // console.log('Country: props......', props);
  // console.log('Country: country....', country);
  // console.log('Country: params......', props.match.params);

  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      {authState.authIsSignedIn ? (
        country.name === '' ? (
          <h4>Loading country from database...</h4>
        ) : (
            <div className="">
              <h4>{country.name} ({country.iso})</h4>
              <Link
                className="btn btn-outline-primary mt-2 btn-block"
                to={encodeURI(`/country-edit/${props.match.params.uid}/${props.match.params.id}`)}
              >Edit Country Details</Link>
              <Link
                className="btn btn-outline-primary mt-2 btn-block"
                to={encodeURI(`/state-new/${props.match.params.uid}/${props.match.params.id}`)}
              >Add Another State</Link>
              <button
                className="btn btn-secondary mt-2 btn-block"
                onClick={() => { props.history.goBack() }}
              >Back</button>
              <ul>
                <li>State</li>
                <li>State</li>
                <li>State</li>
                <li>State</li>
                <li>State</li>
                <li>State</li>
              </ul>
            </div>
          )
      ) : (
          <p className="text-warning">You not signed in!</p>
        )}
    </div>
  );
};

export default Country;
