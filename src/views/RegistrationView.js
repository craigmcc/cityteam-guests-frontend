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

    const [availables, setAvailables] = useState([]);
    const [index, setIndex] = useState(-1);
    const [registration, setRegistration] = useState(null);
    const [registrationDate, setRegistrationDate] =
        useState((new Date()).toISOString().slice(0,10));
    const [registrations, setRegistrations] = useState([]);
    const [showAssigned, setShowAssigned] = useState(false);
    const [showUnassigned, setShowUnassigned] = useState(false);

    useEffect(() => {
        retrieveAllRegistrations(registrationDate);
        // eslint-disable-next-line
    }, [facilityContext.selectedFacility])

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
        console.log("RegistrationView.handleGenerate for (" +
            JSON.stringify(template, ["id", "name"]) + ")");
        TemplateClient.generate(template.id, registrationDate)
            .then(response => {
                console.log("RegistrationView.handleGenerate got (" +
                    JSON.stringify(response.data, ["id", "matNumber", "features"]) + ")");
                setRegistrations(flattenedRegistrations(response.data));
                setIndex(-1);
            })
    }

    const handleHideAssigned = () => {
        console.log("RegistrationView.handleHideAssigned()");
        setShowAssigned(false);
        setAvailables([]);
        retrieveAllRegistrations(registrationDate);
    }

    const handleHideUnassigned = () => {
        console.log("RegistrationView.handleHideUnassigned()");
        setShowUnassigned(false);
        retrieveAllRegistrations(registrationDate);
    }

    const handleRegistrationDate = (newRegistrationDate) => {
        console.log("RegistrationView.handleRegistrationDate(" +
            newRegistrationDate + ")");
        setRegistrationDate(newRegistrationDate);
        retrieveAllRegistrations(newRegistrationDate);
    }

    const handleRegistrationAssign = () => {
        console.log("RegistrationView.handleRegistrationAssign(" +
            JSON.stringify(registration) + ")");
        // TODO - perform the assign
        handleHideUnassigned();
    }

    const handleRegistrationDeassign = () => {
        console.log("RegistrationView.handleRegistrationDeassign(" +
            JSON.stringify(registration) + ")");
        // TODO - perform the deassign
        handleHideAssigned();
    }

    const handleRegistrationReassign = () => {
        console.log("RegistrationView.handleRegistrationReassign(" +
            JSON.stringify(registration) + ")");
        // TODO - perform the reassign
        handleHideAssigned();
    }

    const handleRegistrationUpdate = () => {
        console.log("RegistrationView.handleRegistrationUpdate(" +
            JSON.stringify(registration) + ")");
        // TODO - perform the update
        handleHideAssigned();
    }

    const handleSelectedItem = (newIndex) => {
        if (newIndex === index) {
            console.log("RegistrationView.handleSelectedItem(-1)");
            setIndex(-1);
            setRegistration(false);
            setShowAssigned(false);
            setShowUnassigned(false);
        } else {
            console.log("RegistrationView.handleSelectedItem(" + newIndex + ", " +
                JSON.stringify(registrations[newIndex], ["id", "guest.firstName", "guest.lastName"]) + ")");
            setIndex(newIndex);
            setRegistration(registrations[newIndex]);
            if (registrations[newIndex].guestId) {
                retrieveAvailableRegistrations(registrationDate);
                setShowAssigned(true);
            } else {
                setShowUnassigned(true);
            }
        }
    }

    const retrieveAllRegistrations = (newRegistrationDate) => {
        if (facilityContext.selectedFacility.id <= 0) {
            setRegistrations([]);
            setIndex(-1);
            return;
        }
        FacilityClient.registrationDate(
            facilityContext.selectedFacility.id,
            newRegistrationDate,
            { withGuest: "" }
        )
            .then(response => {
                console.log("RegistrationView.retrieveAllRegistrations(" +
                    JSON.stringify(response.data, ["id", "matNumber", "features", "guest"]) + ")");
                setRegistrations(flattenedRegistrations(response.data));
            })
            .catch(err => {
                console.error("RegistrationView.retrieveAllRegistrations() error: ", err);
                alert(`RegistrationView.retrieveAllRegistrations() error: '${err.message}'`);
            })
        setIndex(-1);
    }

    const retrieveAvailableRegistrations = (newRegistrationDate) => {
        console.log("RegistrationView.retrieveAllRegistrations(" + facilityContext.selectedFacility.id + ", " + registrationDate + ")");
        FacilityClient.registrationAvailable(
            facilityContext.selectedFacility.id,
            newRegistrationDate,
            { withGuest: "" }
        )
            .then(response => {
                console.log("RegistrationView.retrieveAvailableRegistrations(" +
                    JSON.stringify(response.data, ["id", "matNumberAndFeatures"]) + ")");
                setAvailables(flattenedRegistrations(response.data));
            })
            .catch(err => {
                console.error("RegistrationView.retrieveAvailableRegistrations() error: ", err);
                alert(`RegistrationView.retrieveAvailableRegistrations() error: '${err.message}'`);
            })
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
                            handleSelect={handleSelectedItem}
                            headers={["Mat", "First Name",
                                "Last Name", "$$", "Amount",
                                "Shower", "Wakeup", "Comments"]}
                            index={index}
                            items={registrations}
                        />
                    </Col>
                </Row>

                <Row>
                    Click on a row to manage assignments to that mat.
                </Row>

                {/* Assigned Modal */}
                <Modal
                    animation={false}
                    backdrop="static"
                    centered
                    onHide={handleHideAssigned}
                    show={showAssigned}
                    size="lg"
                >

                    <Modal.Header closeButton>
                        <Modal.Title>Manage Assigned Mat</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Container className="ml-1">

{/*
                            <Row>
                                <p>Current Registration:</p>
                                <p> {JSON.stringify(registration, ["id", "matNumberAndFeatures", "guest.firstName", "guest.lastName"])}</p>
                            </Row>
                            <hr/>
*/}

                            <Row>
                                <h6>Option 1: Edit Assignment Details:</h6>
                            </Row>
                            <Row className="ml-1">
                                <Col className="col-12">
                                    { (registration) ? (
                                        <Row>
                                            Mat Number: {registration.matNumberAndFeatures}
                                            &nbsp;&nbsp;
                                            Guest:  {registration.guest.firstName} {registration.guest.lastName}
                                        </Row>
                                    ) : (
                                        <span/>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-10">
                                    <p>TODO - comments, paymentAmount, paymentType, showerTime, wakeupTime</p>
                                </Col>
                                <Col className="col-2 text-right">
                                    <Button
                                        onClick={handleRegistrationUpdate}
                                        variant="primary"
                                    >Save</Button>
                                </Col>
                            </Row>
                            <hr/>

                            <Row>
                                <h6>Option 2: Move Guest To Different Mat:</h6>
                            </Row>
                            <Row>
                                <Col className="col-6">
                                    Transfer this guest (and the associated
                                    assignment details) to the newly selected
                                    mat, and make this mat available for
                                    reassignment.
                                </Col>
                                <Col className="col-4">
                                    TODO
                                </Col>
                                <Col className={"col-2 text-right"}>
                                    <Button
                                        onClick={handleRegistrationReassign}
                                        variant="secondary"
                                    >Move</Button>
                                </Col>
                            </Row>
{/*
                            <Row>
                                <p>Available Registrations:</p>
                            </Row>
                            <Row>
                                <p>{JSON.stringify(availables, ["id", "matNumberAndFeatures"])}</p>
                            </Row>
*/}
                            <hr/>

                            <Row>
                                <h6>Option 3: Remove Existing Assignment</h6>
                            </Row>
                            <Row>
                                <Col className="col-10">
                                    Remove the current assignment details,
                                    and make this mat available for reassignment.
                                </Col>
                                <Col className="col-2 text-right">
                                    <Button
                                        onClick={handleRegistrationDeassign}
                                        variant="danger"
                                    >Remove</Button>
                                </Col>
                            </Row>

                        </Container>

                    </Modal.Body>

                    <Modal.Footer>
                        Press <strong>&times;</strong> to exit with no changes
                    </Modal.Footer>

                </Modal>

                {/* Unassigned Modal */}
                <Modal
                    animation={false}
                    backdrop="static"
                    centered
                    onHide={handleHideUnassigned}
                    show={showUnassigned}
                    size="lg"
                >

                    <Modal.Header closeButton>
                        <Modal.Title>Manage Unassigned Mat</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>TODO - Unassigned Mat body</p>
                        <p>Curent Registration: {JSON.stringify(registration)}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        Press <strong>&times;</strong> to exit with no changes
                    </Modal.Footer>

                </Modal>

            </Container>

        </>

    );

};

export default RegistrationView;
