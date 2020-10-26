import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { ErrorMessage, Field, useField } from "formik";

import CheckboxElement from "./CheckboxElement";

// CheckboxField -------------------------------------------------------------

// Renders a Formik-based input checkbox field (with associated label and
// optional error message components), using our ActionButton and Element classes
// under the covers.

// Properties ----------------------------------------------------------------

// autoFocus                Set automatic focus to this field on render [not set]
// errorClassName           CSS styles for error message [alert alert-danger]
// fieldClassName           CSS styles for the field column [col-9]
// fieldDisabled            Mark input to this field as disabled [not disabled]
// fieldName                Element name (for label mapping) [checkbox]
// fieldValue               Initially selected field value [not rendered]
// label                    Textual label for this field
// labelClassName           CSS styles for label column [col-3]
// onBlur                   Handle (event) for leaving input element [no handler] MAYBE
// onChange                 Handle (event) for input element value change [no handler] MAYBE
// onKeyDown                Handle (event) for key being pressed [no handler] MAYBE

const CheckboxFieldNew = (props) => {

    const [field, meta, helpers] = useField(props);

    return (
        <>
            <CheckboxElement
                autoFocus={props.autoFocus ? props.autoFocus : null}
                fieldClassName={props.fieldClassName ? props.fieldClassName : "col-9"}
                fieldDisabled={props.fieldDisabled ? props.fieldDisabled : null}
                fieldName={props.fieldName ? props.fieldName : "checkbox"}
                fieldValue={props.fieldValue ? props.fieldValue : null}
                labelClassName={props.labelClassName ? props.labelClassName : null}
                // TODO - event handlers need to be wired in to Formik
                // TODO - where is the <Formik> element itself?
            />
            {/*
        <Container fluid>
            <Row className="mb-1">
                 Label goes after the checkbox
                <Col className={labelClassName}><span/></Col>
                <Col className={fieldClassName}>
                    <Field
                        autoFocus={props.autoFocus ? props.autoFocus : null}
                        className="mr-1"
                        id={props.name}
                        name={props.name}
                        type={type}
                    />
                    <label htmlFor={props.name}>
                        {props.label}
                    </label>
                </Col>
            </Row>
            <Row className="mb-1">
                <Col className={labelClassName}><span/></Col>
                <ErrorMessage
                    className={errorClassName}
                    component="div"
                    name={props.name}
                />
            </Row>
        </Container>
*/}
        </>
    );
}

export default CheckboxFieldNew;
