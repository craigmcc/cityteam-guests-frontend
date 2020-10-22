import React from 'react';
import { Switch, Route } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from "react-bootstrap/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
// import logo from './logo.svg';
import './App.css';

import FacilitySelector from "./components/FacilitySelector";
import { FacilityContextProvider } from "./contexts/FacilityContext";
import GuestHistoryView from "./reports/GuestHistory";
import CheckinView from "./views/CheckinView";
import FacilityView from "./views/FacilityView";
import GuestView from "./views/GuestView";
import HomeView from "./views/HomeView";
// import RegistrationView from "./views/RegistrationView";
// import SandboxView from "./sandbox/SandboxView";
import TemplateView from "./views/TemplateView";
import NavDropdown from "react-bootstrap/cjs/NavDropdown";

function App() {

  return (

      <>

        <FacilityContextProvider>

          <Navbar
              bg="info"
              className="mb-3"
              expand={true}
              fixed="top"
              sticky="top"
              variant="dark"
          >

            <Navbar.Brand
                // href="http://cityteam.org"
            >
              <img
                alt="CityTeam Logo"
                height={66}
                src="./CityTeamDarkBlue.png"
                width={160}
              />
            </Navbar.Brand>

            <Nav
                className="mr-auto"
//                defaultActiveKey="/facilities"
            >

              {/* TODO - active link is not getting highlighted */}
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/facilities">Facilities</Nav.Link>
              <Nav.Link href="/guests">Guests</Nav.Link>
              {/*<Nav.Link href="/registrations">Registrations</Nav.Link>*/}
              <Nav.Link href="/templates">Templates</Nav.Link>
              <Nav.Link href="/checkins">Checkins</Nav.Link>
              {/*<Nav.Link href="/sandbox">Sandbox</Nav.Link>*/}

              <NavDropdown title="Reports">
                <NavDropdown.Item href="/reports-DailySummary">
                  Daily Summary
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item href="/reports-GuestHistory">
                  Guest History
                </NavDropdown.Item>
                <NavDropdown.Item href="/reports-MonthlySummary">
                    Monthly Summary
                </NavDropdown.Item>
              </NavDropdown>

            </Nav>

            <Form
                className="mr-4"
                inline
            >
              <FacilitySelector labelClassName="text-light"/>
            </Form>

          </Navbar>

          {/*<Container fluid>*/}

            <Switch>
              <Route exact path={["/", "/home"]}>
                <HomeView/>
              </Route>
              <Route exact path="/checkins">
                <CheckinView/>
              </Route>
              <Route exact path="/facilities">
                <FacilityView/>
              </Route>
              <Route exact path="/guests">
                <GuestView/>
              </Route>
{/*
              <Route exact path="/registrations">
                <RegistrationView/>
              </Route>
*/}
              <Route exact path="/reports-GuestHistory">
                <GuestHistoryView/>
              </Route>
{/*
              <Route exact path="/sandbox">
                <SandboxView/>
              </Route>
*/}
              <Route exact path="/templates">
                <TemplateView/>
              </Route>
              {/* TODO - routes for reports */}
            </Switch>

          {/*</Container>*/}

        </FacilityContextProvider>

      </>

  );
}

export default App;
