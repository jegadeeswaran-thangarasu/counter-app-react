import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'
import { BrowserRouter } from 'react-router-dom';
// import Counter from './components/counter'
// import Movies from './components/movies';

ReactDOM.render(
  <BrowserRouter>
    {/* <Counter /> */}
    {/* <Movies></Movies> */}
    <App></App>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

{/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Vidly</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/movies">
                        Movies
                    </NavLink>
                    <NavLink className="nav-item nav-link text-danger" to="/customers">
                        Customers
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/rentals">
                        Rentals
                    </NavLink>
                </div>
            </div>
        </nav> */}