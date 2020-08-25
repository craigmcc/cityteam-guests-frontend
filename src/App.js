import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import logo from './logo.svg';
import './App.css';

import AddFacility from "./original/AddFacility";
import Facility from "./original/Facility";
import Facilities from "./original/Facilities";
import { FacilityContextProvider } from "./contexts/FacilityContext";
import FacilityView from "./views/FacilityView";
import TemplateView from "./views/TemplateView";

function App() {
  return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            {/*<a href="http://cityteam.org">*/}
              <img src="CityTeamWhite.png" alt="CityTeam Logo"
                   width="160" height="66"/>
            {/*</a>*/}
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/oldfacilities"} className="nav-link">
                  Old Facilities
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/facilities/add"} className="nav-link">
                  Add Facility
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/facilities"} className="nav-link">
                  New Facilities
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/templates"} className="nav-link">
                  New Templates
                </Link>
              </li>
            </div>
          </nav>


          <FacilityContextProvider>
            <div className="container mt-3">
              <Switch>
                <Route exact path="/oldfacilities" component={Facilities} />
                <Route exact path="/facilities/add" component={AddFacility} />
                <Route path="/facilities/:facilityId" component={Facility} />
                <Route exact path={["/", "/facilities"]} component={FacilityView} />
                <Route exact path={["/", "/templates"]} component={TemplateView} />
              </Switch>
            </div>
          </FacilityContextProvider>
        </div>
      </Router>
  );
}

export default App;
