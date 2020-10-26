import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import CheckinAssignedView from "./CheckinAssignedView";
import CheckinRegistrationsView from "./CheckinRegistrationsView";
import CheckinUnassignedView from "./CheckinUnassignedView";
import RegistrationDateSelector from "../components/RegistrationDateSelector";
import { FacilityContext } from "../contexts/FacilityContext";
import * as Dates from "../library/Dates";

const CheckinView = () => {

    const facilityContext = useContext(FacilityContext);

    const [registration, setRegistration] = useState({});
    const [registrationDate, setRegistrationDate] = useState(Dates.today());
//        useState((new Date()).toISOString().slice(0, 10)); // TODO - local date
    const [stage, setStage] = useState("List");

    // Valid Stages:  "List", "Assigned", "Unassigned"

    useEffect(() => {
        console.info("CheckinView.useEffect()");
    });

    const handleRegistration = (newRegistration) => {
        console.info("CheckinView.handleRegistration("
            + JSON.stringify(newRegistration, ["id", "guest.firstName", "guest.lastName"])
            + ")");
        setRegistration(newRegistration);
        if (newRegistration.guestId) {
            setStage("Assigned");
        } else {
            setStage("Unassigned");
        }
    }

    const handleRegistrationDate = (newRegistrationDate) => {
        console.info("CheckinRegistrationsView.handleRegistrationDate(" +
            newRegistrationDate + ")");
        setRegistrationDate(newRegistrationDate);
        setStage("List");
    }

    const handleStage = (newStage) => {
        console.info("CheckinView.handleStage(" + newStage + ")");
        setStage(newStage);
    }

    return (

        <>
            <Container fluid>
                <Row className="mt-3 mb-3 mr-2">
                    <Col className="col-9">
                        <strong>Checkins for {facilityContext.selectedFacility.name}</strong>
                    </Col>
                    <Col className="col-3">
                        <RegistrationDateSelector
                            autoFocus
                            handleRegistrationDate={handleRegistrationDate}
                            registrationDate={registrationDate}
                        />
                    </Col>
                </Row>
            </Container>

            {(stage === "Assigned") ? (
                <CheckinAssignedView
                    handleStage={handleStage}
                    registration={registration}
                />
            ) : null}

            {(stage === "List") ? (
                <CheckinRegistrationsView
                    handleRegistration={handleRegistration}
                    handleStage={handleStage}
                    registrationDate={registrationDate}
                />
            ) : null}

            {(stage === "Unassigned") ? (
                <CheckinUnassignedView
                    handleStage={handleStage}
                    registration={registration}
                />
            ) : null}

        </>

    )

}

export default CheckinView;
