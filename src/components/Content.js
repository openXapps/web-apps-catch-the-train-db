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
    db.collection('country')
      .get()
      .then((snapshot) => {
        console.log('Country: snapshot.docs...', snapshot.docs);
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
        console.log("Country: Error getting documents: ", error);
      });
    return () => {
      console.log('Country: Effect clean-up...');
    };
  }, [db])

  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      <h4>Welcome</h4>
      {authState.authIsSignedIn ? (
        <>
          <p>{`You are signed in as ${user.email}`}</p>
          {countries.length > 0 ? (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="gd-cttdb-mnu-country"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Select a Country</button>
              <div className="dropdown-menu" aria-labelledby="gd-cttdb-mnu-country">
                {countries.map((country, index) => {
                  return (
                    <Link
                      className="dropdown-item"
                      key={index}
                      to={`/country/${user.uid}/${country.id}`}
                    >{country.name}</Link>
                  );
                })}
              </div>
            </div>
          ) : (
              <div>Loading countries...</div>
            )}
        </>
      ) : (
          <p>You not signed in!</p>
        )}
    </div>
  );
};

export default Content;
