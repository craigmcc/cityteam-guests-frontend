import React, { useEffect, useState } from "react";
import { TextField, toEmptyStrings, toNullValues } from "./fields";
import FacilityClient from "../clients/FacilityClient";
import { CancelButton, SaveButton } from "../components/buttons";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

// initialValues Object containing initial values to display, or null to
//   request a blank form returned by internal initialValues() function
// NOPE? onSave Handler (object) with entered form values if Save button is clicked
const FacilityForm = (props) => {

    const [initialValues, setInitialValues] =
        useState(convertInitialValues(props.initialValues));

    useEffect(() => {
        setInitialValues(convertInitialValues(props.initialValues));
    }, [props.initialValues])

    let validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string()
                .required("Name is required")
                .test("unique-name",
                    "That name is already in use",
                    (value) => validateUniqueName(value, initialValues.id)),
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
            enableReinitialize
            initialValues={initialValues}
            key={JSON.stringify(initialValues)}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert("Submitting: " +
                        JSON.stringify(toNullValues(values), null, 2));
                    setSubmitting(false);
                }, 400);
            }}
            validateOnChange={false}
            validationSchema={validationSchema}
        >

            <Form className="form">

                <TextField label="Name:" name="name"/>
                <TextField label="Address:" name="address1"/>
                <TextField label="" name="address2"/>

                <div className="form-row">

                    <div className="row form-group">
                        <label className="col-2" htmlFor="city">City:</label>
                        <Field
                            className="col-4"
                            id="city"
                            name="city"
                            type="text"
                        />
                        <label className="col-1" htmlFor="state">St:</label>
                        <Field
                            className="col-2"
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
                    <div className="col-2"></div>
                    <div className="col-10">
                        <ErrorMessage
                            className="col alert alert-danger"
                            component="div"
                            name="city"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-10">
                        <ErrorMessage
                            className="col alert alert-danger"
                            component="div"
                            name="state"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2"></div>
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
                    <div className="col-2"></div>
                    <SaveButton/>
                    <CancelButton/>
                </div>

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
        FacilityClient.findByNameExact(value)
            .then(response => {
                // Exists, but OK if it is this item
                resolve(id === response.data.id);
            })
            .catch((response) => {
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
