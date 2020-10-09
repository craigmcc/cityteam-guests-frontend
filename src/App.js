import React from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route }
  from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import logo from './logo.svg';
import './App.css';

import FacilitySelector from "./components/FacilitySelector";
import { FacilityContextProvider } from "./contexts/FacilityContext";
import FacilityView from "./views/FacilityView";
import GuestView from "./views/GuestView";
import RegistrationView from "./views/RegistrationView";
import SandboxView from "./sandbox/SandboxView";
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
                  <NavLink
                      activeClassName="active"
                      className="nav-link"
                      to={"/facilities"}
                  >
                    Facilities
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                      activeClassName="active"
                      className="nav-link"
                      to={"/guests"}
                  >
                    Guests
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                      activeClassName="active"
                      className="nav-link"
                      to={"/registrations"}
                  >
                    Registrations
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                      activeClassName="active"
                      className="nav-link"
                      to={"/templates"}
                  >
                    Templates
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                      activeClassName="active"
                      className="nav-link"
                      to={"/sandbox"}
                  >
                    Sandbox
                  </NavLink>
                </li>
              </div>

              <div className="navbar-nav mr-2">
                <FacilitySelector labelClassName="text-secondary"/>
              </div>

            </nav>

            <div className="container fluid">
              <Switch>
                <Route exact path={["/", "/facilities"]}>
                  <FacilityView/>
                </Route>
                <Route exact path="/guests">
                  <GuestView/>
                </Route>
                <Route exact path="/registrations">
                  <RegistrationView/>
                </Route>
                <Route exact path="/sandbox">
                  <SandboxView/>
                </Route>
                <Route exact path="/templates">
                  <TemplateView/>
                </Route>
              </Switch>
            </div>

          </div>

        </Router>

      </FacilityContextProvider>

  );
}

export default App;
