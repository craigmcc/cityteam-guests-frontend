import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import CheckinRegistrationsView from "./CheckinRegistrationsView";
import RegistrationDateSelector from "../components/RegistrationDateSelector";
import { FacilityContext } from "../contexts/FacilityContext";

const CheckinView = () => {

    const facilityContext = useContext(FacilityContext);

    const [registration, setRegistration] = useState({});
    const [registrationDate, setRegistrationDate] =
        useState((new Date()).toISOString().slice(0, 10)); // TODO - local date

    const handleRegistration = (newRegistration) => {
        console.info("CheckinView.handleRegistration("
            + JSON.stringify(newRegistration, ["id", "guest.firstName", "guest.lastName"])
            + ")");
        setRegistration(newRegistration);
    }

    const handleRegistrationDate = (newRegistrationDate) => {
        console.info("CheckinRegistrationsView.handleRegistrationDate(" +
            newRegistrationDate + ")");
        setRegistrationDate(newRegistrationDate);
    }

    return (

        <>
            <Container fluid>
                <Row className="mt-3 mb-3">
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

            <CheckinRegistrationsView
                handleRegistration={handleRegistration}
                registrationDate={registrationDate}
            />

        </>

    )

}

export default CheckinView;
