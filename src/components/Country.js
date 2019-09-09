import React from 'react';
import { Link } from 'react-router-dom';
import useFirebase from '../context/Firebase';

// https://firebase.google.com/docs/reference/js/firebase.firestore

const Country = (props) => {
  const { authState, db } = useFirebase();
  const [uid, setUid] = React.useState('123');
  const [country, setCountry] = React.useState({
    id: '123',
    name: 'bla bla',
    iso: 'xxx',
    enabled: true
  });

  React.useEffect(() => {
    setUid(() => { return props.match.params.uid });
    db.collection('country').doc(props.match.params.id)
      .get()
      .then((snapshot) => {
        console.log('Country: snapshot...', snapshot);
        setTimeout(() => {
          setCountry(() => {
            return {
              id: snapshot.id,
              name: snapshot.get('name'),
              iso: snapshot.get('iso'),
              enabled: snapshot.get('enabled')
            };
          });
        }, 1000);
      })
      .catch((error) => {
        console.log("Country: Error getting document: ", error);
      });
    return () => {
      // console.log('Country: Effect clean-up...');
    };
  }, [props.match.params.uid, props.match.params.id, db])

  // console.log('Country: props......', props);
  // console.log('Country: country....', country);
  // console.log('Country: params......', props.match.params);

  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      {authState.authIsSignedIn ? (
        <>
          <Link
            className="btn btn-outline-primary mt-2 btn-block"
            to={encodeURI(`/country-new/${user.uid}`)}
          >Add Another Country</Link>
          {countries.length > 0 ? (
            countries.map((country, index) => {
              return (
                <div className="mt-2">
                  <Link
                    className="btn btn-outline-info btn-block"
                    key={index}
                    to={`/country/${user.uid}/${country.id}`}
                  >{country.name}</Link>
                </div>
              );
            })
          ) : (
              <div>Loading countries...</div>
            )}
        </>
      ) : (
          <p>You not signed in!</p>
        )}
      {country.id === '123' ? (
        <h4>Loading country from database...</h4>
      ) : (
          <div className="">
            <h4>{country.name} ({country.iso})</h4>
            <Link
              className="btn btn-outline-primary mt-2 btn-block"
              to={encodeURI(`/state/${uid}/${country.id}`)}
            >States / Provinces</Link>
            <Link
              className="btn btn-outline-primary mt-2 btn-block"
              to={encodeURI(`/country-edit/${uid}/${country.id}`)}
            >Edit {country.name}</Link>
            <button
              className="btn btn-secondary mt-2 btn-block"
              onClick={() => { props.history.goBack() }}
            >Back</button>
          </div>
        )}
    </div>
  );
};

export default Country;
