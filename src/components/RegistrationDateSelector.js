import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { TextField } from "../components/fields";

// autoFocus                 Should this field receive autoFocus? [false]
// handleRegistrationDate    Handle (registrationDate) for successful change
// registrationDate          Initial value for registrationDate "field"
const RegistrationDateSelector = (props) => {

    const [initialValues] =
        useState({ registrationDate: props.registrationDate });

    let handleSubmit = (values) => {
        console.info("RegistrationDateSelector.handleSubmit("
            + values.registrationDate
            + ")");
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

            <Container fluid>
                <Form>
                    <Row>
                        <TextField
                            autoFocus={props.autoFocus}
                            fieldClassName="col-5"
                            label="Registration Date:"
                            labelClassName="col-7 text-right"
                            name="registrationDate"
                        />
                    </Row>
                </Form>
            </Container>

        </Formik>

    )

}

export default RegistrationDateSelector;
