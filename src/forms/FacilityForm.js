import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { RemoveButton, ResetButton, SaveButton }
    from "../components/buttons";
import { CheckboxField, TextField, toEmptyStrings, toNullValues }
    from "../components/fields";

import FacilityClient from "../clients/FacilityClient";

// facility     Object containing initial values to display, or null to
//   request a blank form returned by emptyInitialValues() function
// handleInsert Handle (facility) for successful insert
// handleRemove Handle (facility) for successful remove
// handleUpdate Handle (facility) for successful update
const FacilityForm = (props) => {

    const [adding] = useState(!props.facility);
    const [facility, setFacility] =
        useState(convertInitialValues(props.facility));
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

    useEffect(() => {
        setFacility(convertInitialValues(props.facility));
    }, [props.facility])

    let handleInsert = (inserted) => {
        let data = toNullValues(inserted);
        console.info("FacilityForm.handleInsert(" +
            JSON.stringify(data, ["id", "name"]) + ")");
        FacilityClient.insert(data)
            .then(response => {
                if (props.handleInsert) {
                    props.handleInsert(response.data);
                }
            })
            .catch(err => {
                console.error("FacilityForm.insert() error: ", err);
                alert(`FacilityForm.insert() error: '${err.message}'`)
            })
    }

    let handleRemove = () => {
        console.info("FacilityForm.handleRemove(id=" + facility.id + ")");
        FacilityClient.remove(facility.id)
            .then(response => {
                if (props.handleRemove) {
                    props.handleRemove(response.data);
                }
            })
            .catch(err => {
                console.error("FacilityForm.remove() error: ", err);
                alert(`FacilityForm.remove() error: '${err.message}'`);
            })
    }

    let handleRemoveConfirm = () => {
        console.info("FacilityForm.handleRemoveConfirm()");
        setShowRemoveConfirm(true);
    }

    let handleRemoveConfirmNegative = () => {
        console.info("FacilityForm.handleRemoveConfirmNegative()");
        setShowRemoveConfirm(false);
    }

    let handleRemoveConfirmPositive = () => {
        console.info("FacilityForm.handleRemoveConfirmPositive()");
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
        console.info("FacilityForm.handleUpdate(" +
            JSON.stringify(data, ["id", "name"]) + ")");
        FacilityClient.update(data.id, data)
            .then(response => {
                if (props.handleUpdate) {
                    props.handleUpdate(response.data);
                }
            })
            .catch(err => {
                console.error("FacilityForm.update() error: ", err);
                alert(`FacilityForm.update() error: '${err.message}'`);
            })
    }

    let validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string()
                .required("Name is required")
                .test("unique-name",
                    "That name is already in use",
                    (value) => validateUniqueName(value, facility.id)),
            address1: Yup.string(),
            address2: Yup.string(),
            city: Yup.string(),
            state: Yup.string()
                .test("valid-state", "Invalid state abbreviation",
                    (value) => validateState(value)),
            zipCode: Yup.string()
                .test("valid-zip-code",
                    "Invalid zip code format, must be 99999 or 99999-9999",
                    (value) => validateZipCode(value)),
            email: Yup.string()
                .email("Invalid email address format"),
            phone: Yup.string()
                .test("valid-phone",
                    "Invalid phone number format, must be 999-999-9999",
                    (value) => validatePhone(value))
        })
    }

    return (

        <>

            {/* Details Form */}
            <Formik
                // enableReinitialize
                initialValues={facility}
                onSubmit={(values, actions) => {
                    handleSubmit(values, actions);
                }}
                validateOnChange={false}
                validationSchema={validationSchema}
            >

                <Form className="form mr-2">

                    <TextField autoFocus label="Name:" name="name"/>
                    <CheckboxField label="Active?" name="active"/>
                    <TextField label="Address:" name="address1"/>
                    <TextField label="" name="address2"/>

                    <div className="form-row">

                        <div className="row form-group">
                            <label className="col-2" htmlFor="city">City:</label>
                            <Field
                                className="col-5"
                                id="city"
                                name="city"
                                type="text"
                            />
                            <label className="col-1" htmlFor="state">St:</label>
                            <Field
                                className="col-1"
                                id="state"
                                name="state"
                                type="text"
                            />
                            <label className="col-1" htmlFor="zipCode">Zip:</label>
                            <Field
                                className="col-2"
                                id="zipCode"
                                name="zipCode"
                                type="text"
                            />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-2"/>
                        <div className="col-10">
                            <ErrorMessage
                                className="col alert alert-danger"
                                component="div"
                                name="city"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2"/>
                        <div className="col-10">
                            <ErrorMessage
                                className="col alert alert-danger"
                                component="div"
                                name="state"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2"/>
                        <div className="col-10">
                            <ErrorMessage
                                className="col alert alert-danger"
                                component="div"
                                name="zipCode"/>
                        </div>
                    </div>

                    <TextField label="Email:" name="email"/>
                    <TextField label="Phone:" name="phone"/>

                    <div className="row">
                        <div className="col-2"/>
                        <div className="col-8">
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
                        Removing this Facility not reversible, and
                        <strong>
                            &nbsp;will also remove ALL related Guest,
                            Registration, and Template information
                        </strong>.
                    </p>
                    <p>Consider marking this Facility as inactive instead.</p>
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

    );

}

const convertInitialValues = (initialValues) => {
    return initialValues
        ? toEmptyStrings(initialValues)
        : toEmptyStrings(emptyInitialValues());
}

let emptyInitialValues = () => {
    return {
        id: -1,
        active: true,
        address1: "",
        address2: "",
        city: "",
        email: "",
        name: "",
        phone: "",
        state: "",
        zipCode: ""
    }
}

let stateAbbreviations =
      [ "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC",
        "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY",
        "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
        "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
        "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT",
        "VT", "VA", "WA", "WV", "WI", "WY" ];

let validatePhone = (value) => {
    // Not a required field
    if (!value || (value.length === 0)) {
        return true;
    }
    let pattern = /^\d{3}-\d{3}-\d{4}$/;
    return pattern.test(value);
}

let validateState = (value) => {
    // Not a required field
    if (!value || (value.length === 0)) {
        return true;
    }
    return value.length === 2 && stateAbbreviations.indexOf(value) >= 0;
}

let validateUniqueName = (value, id) => {
    return new Promise((resolve) => {
        FacilityClient.exact(value)
            .then(response => {
                // Exists, but OK if it is this item
                resolve(id === response.data.id);
            })
            .catch(() => {
//                console.info("Uniqueness status: ", error.response.status);
//                console.info("Uniqueness body:   " + error.response.data);
                // Does not exist, so definitely unique
                resolve(true);
            })
    })
}

let validateZipCode = (value) => {
    // Not a required field
    if (!value || (value.length === 0)) {
        return true;
    }
    let pattern = /^\d{5}$|^\d{5}-\d{4}$/;
    return pattern.test(value);
}

export default FacilityForm;
