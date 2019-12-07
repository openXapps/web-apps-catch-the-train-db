import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { FirebaseProvider } from '../context/Firebase';

// Components
import Navbar from './Navbar';
import Content from './Content';
import Login from './Login';
import Country from './Country';
import CountryEdit from './CountryEdit';
import State from './State';
import StateEdit from './StateEdit';
import Station from './Station';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Content} />
          <Route path="/login" component={Login} />
          <Route path="/country/:uid/:id" component={Country} />
          <Route path="/country-edit/:uid/:id" component={CountryEdit} />
          <Route path="/country-new/:uid" component={CountryEdit} />
          <Route path="/state/:uid/:id" component={State} />
          <Route path="/state-edit/:uid/:id" component={StateEdit} />
          <Route path="/state-new/:uid" component={StateEdit} />
          <Route path="/station/:uid/:id" component={Station} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
