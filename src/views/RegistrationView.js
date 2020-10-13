import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import FacilityClient from "../clients/FacilityClient";
import TemplateClient from "../clients/TemplateClient";
import { withFlattenedObjects } from "../components/fields";
import List from "../components/List";
import RegistrationDateSelector from "../components/RegistrationDateSelector";
import TemplateSelector from "../components/TemplateSelector";
import { FacilityContext } from "../contexts/FacilityContext";

const RegistrationView = () => {

    const facilityContext = useContext(FacilityContext);

    const [index, setIndex] = useState(-1);
    const [registration, setRegistration] = useState(null);
    const [registrationDate, setRegistrationDate] =
        useState("2020-07-04"); // TODO - "today"
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        retrieveAllItems(registrationDate);
        // eslint-disable-next-line
    }, [facilityContext.selectedFacility])

    const handleGenerate = (template) => {
        console.log("RegistrationView.handleGenerate for (" +
            JSON.stringify(template, ["id", "name"]) + ")");
        TemplateClient.generate(template.id, registrationDate)
            .then(response => {
                console.log("RegistrationView.handleGenerate got (" +
                    JSON.stringify(response.data, ["id", "matNumber", "features"]) + ")");
                saveRegistrations(response.data);
            })
    }

    const handleRegistrationDate = (newRegistrationDate) => {
        console.log("RegistrationView.handleRegistrationDate(" +
            newRegistrationDate + ")");
        setRegistrationDate(newRegistrationDate);
        retrieveAllItems(newRegistrationDate);
    }

    const retrieveAllItems = (newRegistrationDate) => {
        FacilityClient.registrationDate(
            facilityContext.selectedFacility.id,
            newRegistrationDate,
            { withGuest: "" }
        )
            .then(response => {
                console.log("RegistrationView.retrieveAllItems(" +
                    JSON.stringify(response.data, ["id", "matNumber", "features", "guest"]) + ")");
                saveRegistrations(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const saveRegistrations = (registrations) => {
        let flattenedItems =
            withFlattenedObjects(registrations, "guest");
        for (let flattenedItem of flattenedItems) {
            flattenedItem.matNumberAndFeatures = "" + flattenedItem.matNumber;
            if (flattenedItem.features) {
                flattenedItem.matNumberAndFeatures += flattenedItem.features;
            }
        }
        setRegistrations(flattenedItems);
        setIndex(-1);
    }

    return (

        <>

            {/* List View */}
            <Container fluid>

                <Row className="row mt-2 mb-2">
                    <Col className="col-6">
                        <strong>Registrations for {facilityContext.selectedFacility.name}</strong>
                    </Col>
                    <Col className="col-5">
                        <RegistrationDateSelector
                            handleRegistrationDate={handleRegistrationDate}
                            registrationDate={registrationDate}
                        />
                    </Col>
                </Row>

                { (registrations.length === 0) ? (
                    <Row className="mb-2 ml-1">
                        <Col className="col-6 ml-2">
                            <TemplateSelector
                                actionLabel="Generate"
                                handleAction={handleGenerate}
                            />
                        </Col>
                    </Row>
                ) : (
                    <span/>
                )}

                <Row>
                    <Col>
                        <List
                            fields={["matNumberAndFeatures", "guest.firstName",
                                "guest.lastName", "paymentType", "paymentAmount",
                                "showerTime", "wakeupTime", "comments"]}
                            headers={["Mat", "First Name",
                                "Last Name", "$$", "Amount",
                                "Shower", "Wakeup", "Comments"]}
                            index={index}
                            items={registrations}
                        />
                    </Col>
                </Row>

            </Container>

        </>

    );

};

export default RegistrationView;
