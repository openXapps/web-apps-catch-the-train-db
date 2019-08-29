import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import AuthProvider from '../context/AuthProvider';
import { FirebaseProvider } from '../context/Firebase';

// Components
import Navbar from './Navbar';
import Content from './Content';
import Login from './Login';
import State from './State';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Content} />
          <Route path="/login" component={Login} />
          <Route path="/state/:id" component={State} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
