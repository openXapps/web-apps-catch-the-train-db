import React from 'react';
import app from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../config/firebase';

app.initializeApp(firebaseConfig);

const Country = () => {
  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    // const unsubscribe = 
    return () => {};
  })
  
  return (
    <div className="">
      <h4>Country</h4>
    </div>
  );
};

export default Country;
