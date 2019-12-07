import React from 'react';
import useFirebase from '../context/Firebase';
import { countrySchema } from '../config/schemas';

const CountryEdit = (props) => {
  const { authState, db } = useFirebase();
  const [mode, setMode] = React.useState('NEW');
  const [isBusy, setIsBusy] = React.useState(true);
  const [country, setCountry] = React.useState(countrySchema);
  const [title, setTitle] = React.useState('Loading...');

  // Set editor mode effect
  React.useEffect(() => {
    if (props.match.path.indexOf('country-edit') > -1) {
      setMode('EDIT');
      setTitle('Edit country details');
    }
    if (props.match.path.indexOf('country-new') > -1) {
      setMode('NEW');
      setTitle('Creating a new country');
    }
    // Effect cleanup
    return () => true;
  }, [props.match.path])

  // Get country details from FB
  React.useEffect(() => {
    if (mode === 'EDIT' && authState.authIsSignedIn) {
      setIsBusy(true);
      db.collection('country').doc(props.match.params.id)
        .get()
        .then((snapshot) => {
          // console.log('CountryEdit: snapshot...', snapshot);
          setTimeout(() => {
            setCountry({
              name: snapshot.get('name'),
              iso: snapshot.get('iso'),
              enabled: snapshot.get('enabled'),
              modifiedBy: props.match.params.uid,
              modifiedDate: new Date()
            });
            setIsBusy(false);
          }, 500);
        })
        .catch((error) => {
          console.log("CountryEdit: Error getting document: ", error);
        });
    } else {
      setCountry((countrySchema) => {
        return {
          ...countrySchema,
          modifiedBy: props.match.params.uid
        };
      });
      setIsBusy(false);
    }
    // Clean-up
    return () => { };
  }, [props.match.params.id, props.match.params.uid, db, mode, authState.authIsSignedIn])

  const handleSave = (e) => {
    e.preventDefault();
    const collection = db.collection('country')
    setIsBusy(true);
    switch (mode) {
      case 'EDIT':
        // console.log('CountryEdit: mode...', mode);
        collection.doc(props.match.params.id).set(country)
          .then(() => {
            // console.log('CountryEdit: replaced country...', country.name);
            setIsBusy(false);
            props.history.goBack();
          })
          .catch((error) => {
            console.log('CountryEdit: error replacing country...', error);
            setIsBusy(false);
            props.history.goBack();
          });
        break;
      case 'NEW':
        // console.log('CountryEdit: mode...', mode);
        collection.add(country)
          .then((docRef) => {
            // console.log('CountryEdit: new country ID...', docRef.id);
            setIsBusy(false);
            props.history.goBack();
          });
        break;
      default:
      // Nothing to do
    };
  };

  const handleCancel = (e) => {
    e.preventDefault();
    props.history.goBack();
  };

  const handleEnabled = (e) => {
    const x = country.enabled;
    setCountry({ ...country, enabled: !x });
  };

  // console.log('CountryEdit: enabled...', country.enabled);
  // onChange={e => setCountry({ ...country, enabled: e.target.value })}
  // console.log("CountryEdit: country loaded...", country);

  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      <h4>{title}</h4>
      {!authState.authIsSignedIn && (<p className="text-warning">You not signed in!</p>)}
      <form onSubmit={handleSave} autoComplete="off">
        <div className="form-group">
          <label htmlFor="gd-cttdb-fld-country-name">Country Name</label>
          <input
            type="text"
            className="form-control"
            id="gd-cttdb-fld-country-name"
            onChange={e => setCountry({ ...country, name: e.target.value })}
            value={country.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gd-cttdb-fld-country-iso">ISO 3166 Alpha-3</label>
          <input
            type="text"
            className="form-control"
            id="gd-cttdb-fld-country-iso"
            onChange={e => setCountry({ ...country, iso: e.target.value })}
            aria-describedby="gd-cttdb-hlp-country-iso"
            value={country.iso}
          />
          <small id="gd-cttdb-hlp-country-iso" className="form-text text-muted"
          ><a
            href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes"
            target="_blank"
            rel="noopener noreferrer"
          >ISO 3166 Wiki</a></small>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="gd-cttdb-chk-country-enabled"
            onChange={handleEnabled}
            checked={country.enabled}
          />
          <label className="form-check-label" htmlFor="gd-cttdb-chk-country-enabled">Enabled</label>
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary"
          disabled={isBusy || !authState.authIsSignedIn}
        >Save</button>
        <button
          type="button"
          className="btn btn-outline-primary ml-2"
          onClick={handleCancel}
          disabled={isBusy}
        >Cancel</button>
      </form>
    </div>
  );
};

export default CountryEdit;