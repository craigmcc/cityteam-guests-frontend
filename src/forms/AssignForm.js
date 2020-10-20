import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import RegistrationClient from "../clients/RegistrationClient";
import { SelectField, TextField, toEmptyStrings, toNullValues }
    from "../components/fields";
import { reportError } from "../util/error.handling";
import { validatePaymentTypes, validateTime } from "../util/validations";

// assign       Assign object containing initial values to display
// autoFocus    Should we autofocus on the first field?  (Required field for true)
// handleAssign Handle (assign) for successful assignment
const AssignForm = (props) => {

    const [assign] = useState(props.assign);

    useEffect(() => {
        console.info("AssignForm.useEffect(assign="
            + JSON.stringify(assign)
            + ")");
    }, [assign]);

    const handleAssign = (assigned) => {
        let data = toNullValues(assigned);
        console.info("AssignForm.handleAssign(" + JSON.stringify(data) + ")");
        RegistrationClient.assign(assign.id, data)
            .then(response => {
                if (props.handleAssign) {
                    props.handleAssign(response.data);
                }
            })
            .catch(err => {
                reportError("AssignForm.handleAssign()", err);
            })
    }

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);
        handleAssign(values);
        actions.setSubmitting(false);
    }

    const paymentOptions = () => {
        let results = [];
        validatePaymentTypes.forEach(paymentType => {
            results.push({
                value: paymentType.substr(0, 2),
                description: paymentType
            })});
        return results;
    }


    const validationSchema = () => {
        return Yup.object().shape({
            paymentType: Yup.string(), // Implicitly required via select options
            paymentAmount: Yup.number(),
            showerTime: Yup.string()
                .test("valid-shower-time",
                    "showerTime: Invalid time format, must be 99:99",
                    (value) => validateTime(value)),
            wakeupTime: Yup.string()
                .test("valid-wakeup-time",
                    "wakeupTime: Invalid time format, must be 99:99 or 99:99:99",
                    (value) => validateTime(value)),
            comments: Yup.string()
        })
    }

    return (

        <>

            {/* Details Form */}
            <Formik
                initialValues={toEmptyStrings(assign)}
                onSubmit={(values, actions) => {
                    handleSubmit(values, actions);
                }}
                validateOnChange={false}
                validationSchema={validationSchema}
            >

                <Container fluid>

                    <Form>

                        <Row>
                            <Col className="col-6">
                                <SelectField
                                    autoFocus={props.autoFocus}
                                    fieldClassName="col-7"
                                    label="Payment Type:"
                                    labelClassName="col-5"
                                    name="paymentType"
                                    options={paymentOptions}
                                />
                            </Col>
                            <Col className="col-6">
                                <TextField
                                    fieldClassName="col-5"
                                    label="Amount:"
                                    labelClassName="col-7"
                                    name="paymentAmount"
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col className="col-6">
                                <TextField
                                    fieldClassName="col-5"
                                    label="Shower At:"
                                    labelClassName="col-7"
                                    name="showerTime"
                                />
                            </Col>
                            <Col className="col-6">
                                <TextField
                                    fieldClassName="col-5"
                                    label="Wakeup At:"
                                    labelClassName="col-7"
                                    name="wakeupTime"
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <TextField
                                    fieldClassName="col-10"
                                    label="Comments:"
                                    labelClassName="col-2"
                                    name="comments"
                                />
                            </Col>
                        </Row>

                        <Row className="ml-2">
                            <Button
                                disabled={!assign.guestId}
                                size="sm"
                                type="submit"
                                variant="primary"
                            >
                                Save
                            </Button>
                        </Row>

                    </Form>

                </Container>

            </Formik>

        </>

    )

}

export default AssignForm;
