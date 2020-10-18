import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import RegistrationClient from "../clients/RegistrationClient";
import { reportError } from "../util/error.handling";
import AssignForm from "../forms/AssignForm";
import {toEmptyStrings} from "../components/fields";

// handleStage               Handle (stage) change request
// registration              Registration to be processed
const CheckinAssignedView = (props) => {

    useEffect(() => {
        console.info("CheckinAssignedView.useEffect()");

    })

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
        if (props.handleStage) {
            props.handleStage("List");
        } else {
            alert("No handleStage handler was defined!");
        }
    }

    const handleBack = () => {
        console.info("CheckinAssignedView.handleBack()");
        if (props.handleStage) {
            props.handleStage("List");
        } else {
            alert("No handleStage handler was defined!");
        }
    }

    return (

        <Container fluid>

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
                <Col className="col-6 bg-light mb-1">
                    <>
                        <h6>Option 1: Edit Assignment Details</h6>
                        <hr className="mb-7"/>
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
                <Col className="col-3">
                    <>
                        <h6>Option 2: Move Guest To A Different Mat</h6>
                        <hr className="mb-3"/>
                    </>
                </Col>
                <Col className="col-3 bg-light">
                    <>
                        <h6>Option 3: Remove Assignment Details</h6>
                        <hr className="mb-3"/>
                    </>
                </Col>
            </Row>

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
