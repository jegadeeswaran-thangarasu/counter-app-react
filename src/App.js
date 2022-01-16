import { Route, Redirect, Switch } from 'react-router-dom';
// import Counter from './components/counter';
import Movies from './components/movies';
import Rentals from './components/rentals';
import Customers from './components/customers';
import NotFound from './components/not-found';
import './App.css';
import NavBar from './components/nav-bar';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className='container'>
        <Switch>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from='/' exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
