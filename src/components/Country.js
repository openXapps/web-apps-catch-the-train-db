import React from 'react';
import { Link } from 'react-router-dom';
import useFirebase from '../context/Firebase';

// https://firebase.google.com/docs/reference/js/firebase.firestore

const Country = ({ uid }) => {
  const firebase = useFirebase();
  const [countries, setCountries] = React.useState([{ id: '', data: {} }]);

  React.useEffect(() => {
    uid && firebase.db.collection('country')
      .get()
      .then((querySnapshot) => {
        setCountries(() => {
          let x = [];
          querySnapshot.forEach((doc) => {
            x.push({ id: doc.id, data: doc.data() });
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
  }, [uid, firebase.db])

  // console.log('Country: countries...', countries);
  // console.log('Country: user.id...', uid);

  return (
    <div className="">
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
                <Link className="dropdown-item" to={`/state/${country.id}`} key={index}>{country.data.name}</Link>
              );
            })}
            <Link className="dropdown-item" to="/">United State</Link>
            <Link className="dropdown-item" to="/">Germany</Link>
          </div>
        </div>
      ) : (
          <div>Loading countries...</div>
        )}
    </div>
  );
};

export default Country;
