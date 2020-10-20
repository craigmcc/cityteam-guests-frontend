import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import FacilityClient from "../clients/FacilityClient";
import GuestClient from "../clients/GuestClient";
import { toEmptyStrings, toNullValues } from "../components/fields";
import { RemoveButton, ResetButton, SaveButton } from "../components/react.buttons";
import { CheckboxField, TextField } from "../components/react.fields";
import { FacilityContext } from "../contexts/FacilityContext";
import { reportError } from "../util/error.handling";

// guest                    Guest to be edited, or null for adding a new object
// handleInsert             Handle (guest) for successful insert
// handleRemove             Handle (guest) for successful remove
// handleUpdate             Handle (guest) for successful insert or update
// saveLabel                Label for Save button [Save]
// withRemove               Should we render a remove button?
// withReset                Should we render a reset button?
const GuestForm = (props) => {

    const facilityContext = useContext(FacilityContext);

    const [adding] = useState(!props.guest);
    const [guest] = useState(props.guest);
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

    const SHORT_LIST = ["id", "facilityId", "firstName", "lastName"];

    const convertInitialValues = (guest) => {
        return guest
            ? toEmptyStrings(guest)
            : toEmptyStrings(emptyInitialValues());
    }

    const emptyInitialValues = () => {
        return {
            id: -1,
            active: true,
            comments: "",
            facilityId: -1,
            firstName: "",
            lastName: "",
        }
    }

    const handleInsert = (inserted) => {
        let data = toNullValues(inserted);
        data.facilityId = facilityContext.selectedFacility.id;
        console.info("GuestForm.handleInsert("
            + JSON.stringify(data, SHORT_LIST)
            + ")");
        GuestClient.insert(data)
            .then(response => {
                if (props.handleInsert) {
                    props.handleInsert(response.data);
                }
            })
            .catch(err => {
                reportError("GuestForm.handleInsert()", err);
            })
    }

    const handleRemove = () => {
        console.info("GuestForm.handleRemove("
            + JSON.stringify(guest,SHORT_LIST)
            + ")");
        GuestClient.remove(guest.id)
            .then((response) => {
                if (props.handleRemove) {
                    props.handleRemove(response.data);
                }
            })
            .catch(err => {
                reportError("GuestForm.handleRemove()", err);
            })
    }

    const handleRemoveConfirm = () => {
        console.info("GuestForm.handleRemoveConfirm()");
        setShowRemoveConfirm(true);
    }

    const handleRemoveConfirmNegative = () => {
        console.info("GuestForm.handleRemoveConfirmNegative()");
        setShowRemoveConfirm(false);
    }

    const handleRemoveConfirmPositive = () => {
        console.info("GuestForm.handleRemoveConfirmPositive()");
        setShowRemoveConfirm(false);
        handleRemove();
    }

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);
        if (values.id > 0) {
            handleUpdate(values);
        } else {
            handleInsert(values);
        }
        actions.setSubmitting(false);
    }

    const handleUpdate = (updated) => {
        let data = toNullValues(updated);
        data.facilityId = facilityContext.selectedFacility.id;
        console.info("GuestForm.handleUpdate("
            + JSON.stringify(data, SHORT_LIST)
            + ")");
        GuestClient.update(data.id, data)
            .then(response => {
                if (props.handleUpdate) {
                    props.handleUpdate(response.data);
                }
            })
            .catch(err => {
                reportError("GuestForm.handleUpdate()", err);
            })
    }

    const validationSchema = () => {
        return Yup.object().shape({
            firstName: Yup.string()
                .required("First Name is required"),
            lastName: Yup.string()
                .required("Last Name is required")
                .test("unique-name",
                    "That name is already in use within this facility",
                    function (lastName) {
                        return validateUniqueName(this.parent.id,
                            facilityContext.selectedFacility.id,
                            this.parent.firstName,
                            lastName
                        )
                    }),
            comments: Yup.string()
        });
    }

    const validateUniqueName = (guestId, facilityId, firstName, lastName) => {
        console.info("GuestForm.validateUniqueName("
            + ", guestId=" + guestId
            + ", facilityId=" + facilityId
            + ", firstName=" + firstName
            + ", lastName=" + lastName
            + ")");
        return new Promise((resolve) => {
            FacilityClient.guestExact(facilityId, firstName, lastName)
                .then(response => {
                    // Exists but OK if it is this item
                    resolve(guestId === response.data.id);
                })
                .catch(() => {
                    // Does not exist, so definitely unique
                    resolve(true);
                })
        })
    }

    return (

        <>

            {/* Details Form */}
            <Formik
                initialValues={convertInitialValues(guest)}
                onSubmit={(values, actions) => {
                    handleSubmit(values, actions);
                }}
                validateOnChange={false}
                validationSchema={validationSchema}
            >

                <Container fluid>

                    <Form>

                        <Row>
                            <TextField
                                fieldClassName="col-9"
                                label="First Name:"
                                labelClassName="col-3"
                                name="firstName"
                            />
                        </Row>
                        <Row>
                            <TextField
                                fieldClassName="col-9"
                                label="Last Name:"
                                labelClassName="col-3"
                                name="lastName"
                            />
                        </Row>
                        <Row>
                            <CheckboxField
                                fieldClassName="col-9"
                                label="Active?"
                                labelClassName="col-3"
                                name="active"
                            />
                        </Row>
                        <Row className="mb-2">
                            <TextField
                                fieldClassName="col-9"
                                label="Comments:"
                                name="comments"
                                labelClassName="col-3"
                            />
                        </Row>

                        <Row>
                            <Col className="col-3"/>
                            <Col>
                                <SaveButton label={props.saveLabel}/>&nbsp;
                                {(props.withReset) ? (
                                    <ResetButton/>
                                ) : null }
                            </Col>
                            <Col className="justify-content-end">
                                {(props.withRemove) ? (
                                    <RemoveButton
                                        disabled={adding}
                                        onClick={handleRemoveConfirm}
                                    />
                                ) :  null }
                            </Col>
                        </Row>

                    </Form>

                </Container>

            </Formik>

            {/* Remove Confirm Modal */}
            <Modal
                animation={false}
                backdrop="static"
                centered
                dialogClassName="bg-danger"
                onHide={handleRemoveConfirmNegative}
                show={showRemoveConfirm}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>WARNING:  Potential Data Loss</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Removing this Guest not reversible, and
                        <strong>
                            &nbsp;will also remove ALL related
                            Registration history information
                        </strong>.
                    </p>
                    <p>Consider marking this Guest as inactive instead.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={handleRemoveConfirmPositive}
                        variant="danger"
                    >
                        Remove
                    </Button>
                    <Button
                        onClick={handleRemoveConfirmNegative}
                        variant="primary"
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    )

}

export default GuestForm;
