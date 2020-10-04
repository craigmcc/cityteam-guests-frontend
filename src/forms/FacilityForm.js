import React, { useEffect, useState } from "react";
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

    const [adding] =
        useState(!props.facility);
    const [facility, setFacility] =
        useState(convertInitialValues(props.facility));
    const [messageText, setMessageText] =
        useState(null);
    const [messageType, setMessageType] =
        useState("info");

    useEffect(() => {
        setFacility(convertInitialValues(props.facility));
        setMessageText(null);
        setMessageType("info");
    }, [props.facility])

/*
    let handleCancel = () => {
        console.log("FacilityForm.handleCancel(id=" + facility.id + ")");
    }
*/

    let handleInsert = (inserted) => {
        let data = toNullValues(inserted);
        setMessageText("Inserting ...");
        setMessageType("info");
        console.log("FacilityForm.handleInsert(" +
            JSON.stringify(data, ["id", "name"]) + ")");
        FacilityClient.insert(data)
            .then(response => {
                setMessageText("Insert complete");
                if (props.handleInsert) {
                    props.handleInsert(response.data);
                }
            })
            .catch(error => {
                setMessageText("Insert error: " +
                    JSON.stringify(error, null, 2));
                setMessageType("danger");
            })
    }

    let handleRemove = () => {
        console.log("FacilityForm.handleRemove(id=" + facility.id + ")");
        // TODO - confirm dialog?
        setMessageText("Removing ...");
        setMessageType("info");
        FacilityClient.remove(facility.id)
            .then(response => {
                setMessageText("Remove complete");
                if (props.handleRemove) {
                    props.handleRemove(response.data);
                }
            })
            .catch(error => {
                setMessageText("Remove error: " +
                    JSON.stringify(error, null, 2));
                setMessageType("danger");
            })
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
        setMessageText("Updating ...");
        setMessageType("info");
        console.log("FacilityForm.handleUpdate(" +
            JSON.stringify(data, ["id", "name"]) + ")");
        FacilityClient.update(data.id, data)
            .then(response => {
                setMessageText("Update complete");
                if (props.handleUpdate) {
                    props.handleUpdate(response.data);
                }
            })
            .catch(error => {
                setMessageText("Update error: " +
                    JSON.stringify(error, null, 2));
                setMessageType("danger");
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
                            onClick={handleRemove}/>
                    </div>
                </div>

                { (messageText) ? (
                    <div className="row mt-1">
                        <div className="col-2"/>
                        <div className={"alert alert-" + messageType}>
                            {messageText}
                        </div>
                    </div>
                ) : (
                    <div/>
                )}

            </Form>

        </Formik>

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
//                console.log("Uniqueness status: ", error.response.status);
//                console.log("Uniqueness body:   " + error.response.data);
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
