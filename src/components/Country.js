import React from 'react';
import useFirebase from '../context/Firebase';

// https://firebase.google.com/docs/reference/js/firebase.firestore

const Country = ({ uid }) => {
  const firebase = useFirebase();
  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    firebase.db.collection('country')
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log('Country: doc.id.....', doc.id);
          // console.log('Country: doc.data....', doc.data());
          setCountries(() => {
            return [...countries, doc.data()];
          });
        });
      })
      .catch((error) => {
        console.log("Country: Error getting documents: ", error);
      });
    return () => {
      console.log('Country: Effect clean-up...');
    };
  }, [])

  // console.log('Country: countries...', countries);
  // console.log('Country: user.id...', uid);

  return (
    <div className="">
      <h4>Countries</h4>
      {countries.length > 0 ? (
        countries.map((country, index) => {
          return (
            <div key={index}>{country.name}</div>
          );
        })
      ) : (
          <div>Loading countries...</div>
        )}
    </div>
  );
};

export default Country;
