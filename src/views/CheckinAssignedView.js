import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import FacilityClient from "../clients/FacilityClient";
import RegistrationClient from "../clients/RegistrationClient";
import { reportError } from "../util/error.handling";
import AssignForm from "../forms/AssignForm";
import { toEmptyStrings } from "../components/fields";

// handleStage               Handle (stage) change request
// registration              Registration to be processed
const CheckinAssignedView = (props) => {

    // Global Support --------------------------------------------------------

    const handleBack = () => {
        console.info("CheckinAssignedView.handleBack()");
        requestStage("List");
    }

    const requestStage = (stage) => {
        console.info("CheckinAssignedView.requestStage(" + stage + ")");
        if (props.handleStage) {
            props.handleStage(stage);
        } else {
            alert("No handleStage handler was defined!");
        }
    }

    // For Option 1 ----------------------------------------------------------

    const extractAssign = (registration) => {
        return {
            id: registration.id,
            comments: registration.comments,
            guestId: registration.guestId,
            paymentAmount: registration.paymentAmount,
            paymentType: registration.paymentType,
            showerTime: registration.showerTime,
            wakeupTime: registration.wakeupTime
        }
    }

    const handleAssign = (newRegistration) => {
        console.info("CheckinAssignedView.handleAssign("
            + JSON.stringify(newRegistration)
            + ")");
        requestStage("List");
    }

    // For Option 2 ----------------------------------------------------------

    const [availableId, setAvailableId] = useState(-1);
    const [availables, setAvailables] = useState([]);

    useEffect(() => {

        const retrieveAvailableRegistrations = () => {
            console.info("CheckinAssignedView.retrieveAvailableRegistrations() for("
                + JSON.stringify(props.registration, ["id", "facilityId", "registrationDate"])
                + ")");
            FacilityClient.registrationAvailable(
                props.registration.facilityId,
                props.registration.registrationDate
            )
                .then(response => {
                    console.info("RegistrationView.retrieveAvailableRegistrations("
                        + JSON.stringify(response.data, ["id", "matNumber"])
                        + ")");
                    setAvailableId(-1);
                    setAvailables(flattenedRegistrations(response.data));
                })
                .catch(err => {
                    reportError("CheckinAssignedView.retrieveAvailableRegistrations()", err);
                    setAvailableId(-1);
                    setAvailables([]);
                })
        }

        console.info("CheckinAssignedView.useEffect()");
        retrieveAvailableRegistrations();

    }, [props.registration]);

    const flattenedRegistrations = (registrations) => {
        let flattenedItems = registrations;
        for (let flattenedItem of flattenedItems) {
            flattenedItem.matNumberAndFeatures = "" + flattenedItem.matNumber;
            if (flattenedItem.features) {
                flattenedItem.matNumberAndFeatures += flattenedItem.features;
            }
        }
        return flattenedItems;
    }

    const handleAvailableChange = (event) => {
        console.info("CheckinAssignedView.handleAvailableChange("
            + event.target.value
            + ")");
        setAvailableId(event.target.value);
    }

    const handleReassign = () => {
        console.info("CheckinAssignedView.handleReassign("
            + JSON.stringify(props.registration)
            + ", to="
            + availableId
            + ")");
        RegistrationClient.reassign(props.registration.id, availableId)
            .then(response => {
                setAvailableId(-1);
                requestStage("List");
            })
            .catch(err => {
                reportError("CheckAssignedView.handleReassign()", err);
            })
    }

    // For Option 3 ----------------------------------------------------------

    const [showDeassignConfirm, setShowDeassignConfirm] = useState(false);

    const handleDeassignConfirm = () => {
        console.info("RegistrationView.handleDeassignConfirm()");
        setShowDeassignConfirm(true);
    }

    const handleDeassignConfirmNegative = () => {
        console.info("RegistrationView.handleDeassignConfirmNegative()");
        setShowDeassignConfirm(false);
    }

    const handleDeassignConfirmPositive = () => {
        console.info("RegistrationView.handleDeassignConfirmPositive("
            + JSON.stringify(props.registration,
                ["id", "guestId", "guest.firstName", "guest.lastName"])
            + ")");
        RegistrationClient.deassign(props.registration.id)
            .then(response => {
                setShowDeassignConfirm(false);
                requestStage("List");
            })
            .catch(err => {
                reportError
                    ("CheckinAssignedView.handleDeassignConfirmPositive()", err);
            })
    }

    return (

        <Container fluid>

            {/* Common Header -------------------------------------------- */}

            <Row className="mb-4">
                <Col className="col-11">
                    { (props.registration && props.registration.guest) ? (
                        <>
                            <Row className="justify-content-center">
                                Mat Number:&nbsp;
                                <span className="text-info">
                                    {props.registration.matNumberAndFeatures}
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                                Guest:&nbsp;
                                <span className="text-info">
                                    {props.registration.guest.firstName}&nbsp;
                                    {props.registration.guest.lastName}
                                </span>
                            </Row>
                        </>
                    ) : (
                        <span>No registration or guest yet</span>
                    )}

                </Col>
                <Col className="col-1">
                    <Button
                        onClick={handleBack}
                        size="sm"
                        variant="outline-primary"
                    >
                        Back
                    </Button>
                </Col>
            </Row>

            <Row className="mb-3 ml-1 mr-1">

                {/* Option 1 --------------------------------------------- */}


                <Col className="col-6 bg-light mb-1">
                    <>
                        <h6>Option 1: Edit Assignment Details</h6>
                        <hr className="mb-3"/>
                        { (props.registration && props.registration.guest) ? (
                            <AssignForm
                                assign={toEmptyStrings(extractAssign(props.registration))}
                                handleAssign={handleAssign}
                            />
                        ) : (
                            <span>No registration or guest yet</span>
                        )}
                    </>
                </Col>

                {/* Option 2 --------------------------------------------- */}

                <Col className="col-3">
                    <>
                        <h6>Option 2: Move Guest To A Different Mat</h6>
                        <hr className="mb-3"/>
                        <Row className="ml-2 mb-3">
                            Move this Guest (and transfer the related assignment
                            details) to a different mat.
                        </Row>
                        <Row className="ml-2 mb-2">
                            <label
                                className="mr-3"
                                htmlFor="availableMat">Move To Mat:</label>
                            <select
                                className="mr-3"
                                id="availableMat"
                                name="availableMat"
                                onChange={handleAvailableChange}
                                value={(availableId) ? availableId.id : -1}
                            >
                                <option key="0" value="0">
                                    (Select)
                                </option>
                                {availables.map(choice => (
                                    <option
                                        key={choice.id}
                                        value={choice.id}
                                    >
                                        {choice.matNumberAndFeatures}
                                    </option>
                                ))}
                            </select>
                            <Button
                                disabled={availableId <= 0}
                                onClick={handleReassign}
                                size="sm"
                                variant="primary"
                            >
                                Move
                            </Button>
                        </Row>
                    </>
                </Col>

                {/* Option 3 --------------------------------------------- */}

                <Col className="col-3 bg-light">
                    <>
                        <h6>Option 3: Remove Assignment Details</h6>
                        <hr className="mb-3"/>
                        <Row className="ml-2 mb-3">
                            Remove the current assignment, erasing any
                            of the details that were specified.  If you
                            just want to move an assigned Guest to a
                            different available mat, use Option 2 instead.
                        </Row>
                        <Row className="justify-content-end">
                            <Button
                                onClick={handleDeassignConfirm}
                                size="sm"
                                variant="danger"
                            >
                                Remove
                            </Button>
                        </Row>
                    </>
                </Col>

            </Row>

            {/* Option 3 Confirm Modal ----------------------------------- */}

            <Modal
                animation={false}
                backdrop="static"
                centered
                onHide={handleDeassignConfirmNegative}
                show={showDeassignConfirm}
                size="lg"
            >

                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deassign</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Do you really want to remove this assignment
                        and erase the assignment details (including which
                        Guest was assigned to this mat)?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={handleDeassignConfirmPositive}
                        variant="danger"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={handleDeassignConfirmNegative}
                        variant="primary"
                    >
                        Cancel
                    </Button>
                </Modal.Footer>

            </Modal>

            {/* Common Footer -------------------------------------------- */}

            <Row>
                <Col className="col-11">
                    <Row className="justify-content-center">
                        Click&nbsp;<span className="text-primary">Back</span>&nbsp;
                        to return the the list with no changes.
                    </Row>
                </Col>
                <Col className="col-1"/>
            </Row>

        </Container>

    )

}

export default CheckinAssignedView;
