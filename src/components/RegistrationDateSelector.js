import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { TextField } from "../components/fields";

// handleRegistrationDate - Handle (registrationDate) for successful change
// registrationDate - Initial value for registrationDate "field"
const RegistrationDateSelector = (props) => {

    const [initialValues] =
        useState({ registrationDate: props.registrationDate });

    // TODO - do we need a useEffect?

    let handleSubmit = (values) => {
        console.log("RegistrationDateSelector.handleSubmit(" +
            values.registrationDate + ")");
        if (props.handleRegistrationDate) {
            props.handleRegistrationDate(values.registrationDate);
        }
    }

    let validationSchema = () => {
        return Yup.object().shape({
            registrationDate: Yup.string()
                // TODO - test for valid date
        })
    }

    return (

        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
            validateOnChange={false}
            validationSchema={validationSchema}
        >

            <Form className="form">

                <TextField
                    autoFocus
                    fieldClassName="col-7"
                    label="Registration Date:"
                    labelClassName="col-5"
                    name="registrationDate"
                />

            </Form>

        </Formik>

    )

}

export default RegistrationDateSelector;
