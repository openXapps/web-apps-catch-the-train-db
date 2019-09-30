import React from 'react';
// import useFirebase from '../context/Firebase';

const StateEdit = (props) => {
  // const { db } = useFirebase();
  const [mode, setMode] = React.useState('NEW');
  const [isBusy, setIsBusy] = React.useState(true);
  const [state, setState] = React.useState({
    country_id: '',
    name: '',
    enabled: false,
    modifiedBy: '',
    modifiedDate: new Date()
  });
  const [title, setTitle] = React.useState('Loading...');

  // Set editor mode effect
  React.useEffect(() => {
    if (props.match.path.indexOf('state-edit') > -1) {
      setMode('EDIT');
      setTitle('Edit state details');
    }
    if (props.match.path.indexOf('state-new') > -1) {
      setMode('NEW');
      setTitle('Creating a new state');
    }
    // Effect clean-up function
    return () => true;
  }, [props.match.path])

  // Get state details from FB
  // React.useEffect(() => {
  //   if (mode === 'EDIT') {
  //     setIsBusy(true);
  //     db.collection('state').doc(props.match.params.id)
  //       .get()
  //       .then((snapshot) => {
  //         console.log('StateEdit: snapshot...', snapshot);
  //         setTimeout(() => {
  //           setState(() => {
  //             return {
  //               name: snapshot.get('name'),
  //               iso: snapshot.get('iso'),
  //               enabled: snapshot.get('enabled')
  //             };
  //           });
  //           setIsBusy(false);
  //         }, 1000);
  //       })
  //       .catch((error) => {
  //         console.log("StateEdit: Error getting document: ", error);
  //       });
  //   } else {
  //     setState(() => {
  //       return {
  //         name: '',
  //         iso: '',
  //         enabled: false
  //       };
  //     });
  //     setIsBusy(false);
  //   }
  //   // Clean-up
  //   return () => { };
  // }, [props.match.params.id, db, mode])

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   const collection = db.collection('country')
  //   setIsBusy(true);
  //   switch (mode) {
  //     case 'EDIT':
  //       console.log('CountryEdit: mode...', mode);
  //       setIsBusy(false);
  //       props.history.goBack();
  //       break;
  //     case 'NEW':
  //       console.log('CountryEdit: mode...', mode);
  //       collection.add(country)
  //         .then((docRef) => {
  //           console.log('CountryEdit: new country ID...', docRef.id);
  //           setIsBusy(false);
  //           props.history.goBack();
  //         });
  //       break;
  //     default:
  //     // Nothing to do
  //   };
  // };

  const handleCancel = (e) => {
    e.preventDefault();
    props.history.goBack();
  };

  const handleEnabled = (e) => {
    const x = state.enabled;
    setState({ ...state, enabled: !x });
  };

  // console.log('CountryEdit: enabled...', country.enabled);
  // onChange={e => setCountry({ ...country, enabled: e.target.value })}

  return (
    <div className="border border-primary rounded-lg m-3 p-3">
      <h4>{title}</h4>
      <form onSubmit={e => {}} autoComplete="off">
        <div className="form-group">
          <label htmlFor="gd-cttdb-fld-state-name">State Name</label>
          <input
            type="text"
            className="form-control"
            id="gd-cttdb-fld-state-name"
            onChange={e => setState({ ...state, name: e.target.value })}
            value={state.name}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="gd-cttdb-chk-state-enabled"
            onChange={handleEnabled}
            checked={state.enabled}
          />
          <label className="form-check-label" htmlFor="gd-cttdb-chk-state-enabled">Enabled</label>
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary"
          disabled={isBusy}
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

export default StateEdit;