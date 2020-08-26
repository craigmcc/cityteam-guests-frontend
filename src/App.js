import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import logo from './logo.svg';
import './App.css';

import { FacilityContextProvider } from "./contexts/FacilityContext";
import FacilityView from "./views/FacilityView";
import TemplateView from "./views/TemplateView";

function App() {

  return (

      <FacilityContextProvider>

        <Router>

          <div>

            <nav className="navbar navbar-expand navbar-dark bg-dark">
              {/*<a href="http://cityteam.org">*/}
              <img src="./CityTeamWhite.png" alt="CityTeam Logo"
                   width="160" height="66" className="navbar-brand"/>
              {/*</a>*/}
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/facilities"} className="nav-link">
                    Facilities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/templates"} className="nav-link">
                    Templates
                  </Link>
                </li>
              </div>
            </nav>

            <div className="container mt-3">
              <Switch>
                <Route
                    component={FacilityView}
                    exact
                    path={["/", "/facilities"]}
                />
                <Route
                    component={TemplateView}
                    exact
                    path={["/templates"]}
                />
              </Switch>
            </div>

          </div>

        </Router>

      </FacilityContextProvider>

  );
}

export default App;
