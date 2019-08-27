import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import AuthProvider from '../context/AuthProvider';
import { FirebaseProvider } from '../context/Firebase';

// Components
import Navbar from './Navbar';
import Content from './Content';
import Login from './Login';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Content} />
          <Route exact path="/login" component={Login} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
