import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { withFlattenedObjects} from "../components/fields";
import FacilityClient from "../clients/FacilityClient";
import TemplateClient from "../clients/TemplateClient";
import List from "../components/List";
import TemplateSelector from "../components/TemplateSelector";
import { FacilityContext } from "../contexts/FacilityContext";
import { reportError } from "../util/error.handling";

// handleRegistration        Handle (registration) when a registration is selected
//                           (will receive null when unselected).  [No handler]
// registrationDate          Registration date for which to list registrations
//                           (will offer to generate if there are none for this facility)
const CheckinRegistrationsView = (props) => {

    const facilityContext = useContext(FacilityContext);

    const [registrationIndex, setRegistrationIndex] = useState(-1);
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        retrieveAllRegistrations(props.registrationDate);
        // eslint-disable-next-line
    }, [facilityContext.selectedFacility, props.registrationDate]);

    const flattenedRegistrations = (registrations) => {
        let flattenedItems =
            withFlattenedObjects(registrations, "guest");
        for (let flattenedItem of flattenedItems) {
            flattenedItem.matNumberAndFeatures = "" + flattenedItem.matNumber;
            if (flattenedItem.features) {
                flattenedItem.matNumberAndFeatures += flattenedItem.features;
            }
        }
        return flattenedItems;
    }

    const handleGenerate = (template) => {
        console.info("CheckinRegistrationsView.handleGenerate for (" +
            JSON.stringify(template, ["id", "name"]) + ")");
        TemplateClient.generate(template.id, props.registrationDate)
            .then(response => {
                console.info("CheckinRegistrationsView.handleGenerate got (" +
                    JSON.stringify(response.data, ["id", "matNumber", "features"]) + ")");
                setRegistrations(flattenedRegistrations(response.data));
                setRegistrationIndex(-1);
            })
    }

    const handleRegistrationSelect = (newIndex) => {
        if (newIndex === registrationIndex) {
            console.info("CheckinRegistrationsView.handleRegistrationSelect(-1)");
            setRegistrationIndex(-1);
            if (props.handleRegistration) {
                props.handleRegistration(null);
            }
        } else {
            console.info("CheckinRegistrationsView.handleRegistrationSelect("
                + newIndex + ", "
                + JSON.stringify(registrations[newIndex], ["id", "guest.firstName", "guest.lastName"])
                + ")");
            setRegistrationIndex(newIndex);
            if (props.handleRegistration) {
                props.handleRegistration(registrations[newIndex]);
            }
        }
    }

    const retrieveAllRegistrations = (newRegistrationDate) => {
        if (facilityContext.selectedFacility.id <= 0) {
            setRegistrationIndex(-1);
            setRegistrations([]);
            return;
        }
        FacilityClient.registrationDate(
            facilityContext.selectedFacility.id,
            newRegistrationDate,
            { withGuest: "" }
        )
            .then(response => {
                console.info("CheckinRegistrationsView.retrieveAllRegistrations("
                    + JSON.stringify(response.data, ["id", "matNumber"])
                    + ")");
                setRegistrationIndex(-1);
                setRegistrations(flattenedRegistrations(response.data));
            })
            .catch(err => {
                reportError("CheckinRegistrationsView.retrieveAllRegistrations()", err);
            });
    }

    return (

        <Container fluid>

            { (facilityContext.selectedFacility) && (registrations.length === 0) ? (
                <Row className="mb-3 ml-1">
                    <TemplateSelector
                        actionLabel="Generate"
                        handleTemplate={handleGenerate}
                    />
                </Row>
            ) : (
                <span/>
            )}

            <Row className="mb-3">
                <Col>
                    <List
                        fields={["matNumberAndFeatures", "guest.firstName",
                            "guest.lastName", "paymentType", "paymentAmount",
                            "showerTime", "wakeupTime", "comments"]}
                        handleSelect={handleRegistrationSelect}
                        headers={["Mat", "First Name",
                            "Last Name", "$$", "Amount",
                            "Shower", "Wakeup", "Comments"]}
                        index={registrationIndex}
                        items={registrations}
                    />
                </Col>
            </Row>

            <Row className="mb-3 ml-1">
                Click on a row to create a new assignment, or manage an existing
                assignment, for that mat.
            </Row>

        </Container>

    )

}

export default CheckinRegistrationsView;
