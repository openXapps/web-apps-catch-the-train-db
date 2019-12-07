import React from 'react';
import { Link } from 'react-router-dom';
import useFirebase from '../context/Firebase';

const Content = () => {
  const { user, authState, db } = useFirebase();
  const [countries, setCountries] = React.useState([{
    id: '',
    name: '',
    iso: '',
    enabled: true
  }]);

  React.useEffect(() => {
    if (authState.authIsSignedIn) {
      db.collection('country').orderBy('name')
        .get()
        .then((snapshot) => {
          console.log('Content.Country: snapshot.docs...', snapshot.docs);
          setCountries(() => {
            let x = [];
            snapshot.docs.forEach((doc) => {
              x.push({
                id: doc.id,
                name: doc.data().name,
                iso: doc.data().iso,
                enabled: doc.data().enabled
              });
            });
            return x;
          });
        })
        .catch((error) => {
          console.log("Content.Country: Error getting documents: ", error);
        });
    }
    // Effect cleanup
    return () => {
      console.log('Content.Country: Effect clean-up...');
    };
  }, [db, authState.authIsSignedIn])

  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      <h4>Welcome</h4>
      {authState.authIsSignedIn ? (
        <>
          <p>{`You are signed in as ${user.email}`}</p>
          <Link
            className="btn btn-outline-primary mt-2 btn-block"
            to={encodeURI(`/country-new/${user.uid}`)}
          >Add Another Country</Link>
          {countries.length > 0 ? (
            countries.map((country, index) => {
              const style = country.enabled ? ('btn btn-outline-info btn-block mt-2') : ('btn btn-outline-warning btn-block mt-2');
              return (
                <Link
                  className={style}
                  key={index}
                  to={`/country/${user.uid}/${country.id}`}
                >{country.name}</Link>
              );
            })
          ) : (
              <div>Loading countries...</div>
            )}
        </>
      ) : (
          <p className="text-warning">You not signed in!</p>
        )}
    </div>
  );
};

export default Content;
