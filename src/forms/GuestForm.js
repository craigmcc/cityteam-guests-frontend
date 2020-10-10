import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import FacilityClient from "../clients/FacilityClient";
import GuestClient from "../clients/GuestClient";
import { TextField, toEmptyStrings, toNullValues }
    from "../components/fields";
import { RemoveButton, ResetButton, SaveButton }
    from "../components/buttons";

import { FacilityContext } from "../contexts/FacilityContext";

// guest        Guest to be edited, or null for adding a new object
// handleInsert Handle (guest) for successful insert
// handleRemove Handle (guest) for successful remove
// handleUpdate Handle (guest) for successful insert or update
const GuestForm = (props) => {

    const facilityContext = useContext(FacilityContext);

    const [adding] = useState(!props.guest);
    const [guest, setGuest] =
        useState(convertInitialValues(props.guest));
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

    useEffect(() => {
        setGuest(convertInitialValues(props.guest));
    }, [props.guest])

    let handleInsert = (inserted) => {
        let data = toNullValues(inserted);
        data.facilityId = facilityContext.selectedFacility.id;
        console.info("GuestForm.handleInsert(" +
            JSON.stringify(data, ["id", "firstName", "lastName"]) + ")");
        GuestClient.insert(data)
            .then(response => {
                if (props.handleInsert) {
                    props.handleInsert(response.data);
                }
            })
            .catch(err => {
                console.error("GuestForm.insert() error: ", err);
                alert(`GuestForm.insert() error: '${err.message}'`);
            })
    }

    let handleRemove = () => {
        console.info("GuestForm.handleRemove(" +
            JSON.stringify(guest,
                ["id", "firstName", "lastName"]) + ")");
        GuestClient.remove(guest.id)
            .then((response) => {
                if (props.handleRemove) {
                    props.handleRemove(response.data);
                }
            })
            .catch(err => {
                console.error("GuestForm.remove() error: ", err);
                alert(`GuestForm.insert() error: '${err.message}'`);
            })
    }

    let handleRemoveConfirm = () => {
        console.info("GuestForm.handleRemoveConfirm()");
        setShowRemoveConfirm(true);
    }

    let handleRemoveConfirmNegative = () => {
        console.info("GuestForm.handleRemoveConfirmNegative()");
        setShowRemoveConfirm(false);
    }

    let handleRemoveConfirmPositive = () => {
        console.info("GuestForm.handleRemoveConfirmPositive()");
        setShowRemoveConfirm(false);
        handleRemove();
    }

    let handleSubmit = (values, actions) => {
        actions.setSubmitting(true);
        if (values.id > 0) {
            handleUpdate(values);
        } else {
            handleInsert(values);
        }
        actions.setSubmitting(false);
    }

    let handleUpdate = (updated) => {
        let data = toNullValues(updated);
        data.facilityId = facilityContext.selectedFacility.id;
        console.info("GuestForm.handleUpdate(" +
            JSON.stringify(data, ["id", "firstName", "lastName"]) + ")");
        GuestClient.update(data.id, data)
            .then(response => {
                if (props.handleUpdate) {
                    props.handleUpdate(response.data);
                }
            })
            .catch(err => {
                console.error("GuestForm.update() error: ", err);
                alert(`GuestForm.update() error: '${err.message}'`);
            })
    }

    let validationSchema = () => {
        return Yup.object().shape({
            firstName: Yup.string()
                .required("First Name is required"),
            lastName: Yup.string()
                .required("Last Name is required")
                .test("unique-name",
                    "That name is already in use within this facility",
                    function (value) {
                        return validateUniqueName(value,
                            this.parent.firstName,
                            facilityContext.selectedFacility.id,
                            guest.id)
                    }),
            comments: Yup.string()
        });
    }

    return (

        <>

            {/* Details Form */}
            <Formik
                // enableReinitialize
                initialValues={guest}
                onSubmit={(values, actions) => {
                    handleSubmit(values, actions);
                }}
                validateOnChange={false}
                validationSchema={validationSchema}
            >

                <Form className="form mr-2">

                    <div className="form-row mb-1">
                        <div className="col-3"/>
                        <div className="col-9">
                            <h4>Guest Details</h4>
                        </div>
                    </div>

                    <TextField
                        autoFocus
                        fieldClassName="col-9"
                        label="First Name:"
                        labelClassName="col-3"
                        name="firstName"/>
                    <TextField
                        fieldClassName="col-9"
                        label="Last Name:"
                        labelClassName="col-3"
                        name="lastName"/>
                    <TextField
                        fieldClassName="col-9"
                        label="Comments:"
                        labelClassName="col-3"
                        name="comments"/>

                    <div className="row">
                        <div className="col-3"/>
                        <div className="col-7">
                            <SaveButton/>
                            <ResetButton/>
                        </div>
                        <div className="col-2 float-right">
                            <RemoveButton
                                disabled={adding}
                                onClick={handleRemoveConfirm}/>
                        </div>
                    </div>

                </Form>

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

let convertInitialValues = (guest) => {
    return guest
        ? toEmptyStrings(guest)
        : toEmptyStrings(emptyInitialValues());
}

let emptyInitialValues = () => {
    return {
        id: -1,
        comments: "",
        facilityId: -1,
        firstName: "",
        lastName: "",
    }
}

let validateUniqueName = (value, firstName, facilityId, id) => {
    console.info("GuestForm.validateUniqueName(lastName=" + value +
        ", firstName=" + firstName + ", facilityId=" + facilityId + ", id=" + id + ")");
    return new Promise((resolve) => {
        FacilityClient.guestExact(facilityId, firstName, value)
            .then(response => {
                // Exists but OK if it is this item
                resolve(id === response.data.id);
            })
            .catch(() => {
                // Does not exist, so definitely unique
                resolve(true);
            })
    })
}

export default GuestForm;
