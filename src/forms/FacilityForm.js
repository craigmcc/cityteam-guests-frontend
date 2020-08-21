import React, { useEffect, useState } from "react";
import { CancelButton, SaveButton } from "../components/buttons";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField, toEmptyStrings, toNullValues } from "./fields";
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
                    <ErrorMessage
                        className="col alert alert-danger" name="city"/>
                </div>
                <div className="row">
                    <ErrorMessage
                        className="col alert alert-danger" name="state"/>
                </div>
                <div className="row">
                    <ErrorMessage
                        className="col alert alert-danger" name="zipCode"/>
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

const emptyInitialValues = () => {
    return {
        id: null,
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

const validationSchema = () => {
    return Yup.object().shape({
        name: Yup.string()
            .required(),
        address1: Yup.string(),
        address2: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),    // TODO - special validation
        zipCode: Yup.string(),  // TODO - special validation
        email: Yup.string()
            .email("Invalid email address format")
    })
}

export default FacilityForm;