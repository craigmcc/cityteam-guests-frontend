import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import logo from './logo.svg';
import './App.css';

import AddFacility from "./components/AddFacility";
import Facility from "./components/Facility";
import Facilities from "./components/Facilities";

function App() {
  return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tutorials" className="navbar-brand">
              CityTeam
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/facilities"} className="nav-link">
                  Facilities
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/facilities/add"} className="nav-link">
                  Add Facility
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/facilities"]} component={Facilities} />
              <Route exact path="/facilities/add" component={AddFacility} />
              <Route path="/facilities/:facilityId" component={Facility} />
            </Switch>
          </div>
        </div>
      </Router>
  );
}


/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/



export default App;
