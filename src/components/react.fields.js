import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { ErrorMessage, Field } from "formik";

// CheckboxField -------------------------------------------------------------

// autoFocus                Set automatic focus to this field on render [not set]
// errorClassName           CSS styles for error message [alert alert-danger]
// fieldClassName           CSS styles for the field column [col-10]
// label                    Textual label for this field
// labelClassName           CSS styles for label column [col-2]
// name                     Field name in the containing object
// type                     Field type [text]

export const CheckboxField = (props) => {

//    const [field, meta] = useField(props);
    let errorClassName =
        props.errorClassName ? props.errorClassName : "alert alert-danger";
    let fieldClassName =
        props.fieldClassName ? props.fieldClassName : "col-9";
    let labelClassName =
        props.labelClassName ? props.labelClassName : "col-3";
    let type = props.type ? props.type : "checkbox";

    return (
        <Container fluid>
            <Row className="mb-1">
                {/* Label goes after the checkbox */}
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
    );
}

// SelectField ---------------------------------------------------------------

// autoFocus                Set automatic focus to this field on render [not set]
// errorClassName           CSS styles for error message [alert alert-danger]
// fieldClassName           CSS styles for the field column [col-9]
// label                    Textual label for this field
// labelClassName           CSS styles for label column [col-3]
// name                     Field name in the containing object
// options                  Array of options with "value" and "description" fields
// value                    Currently selected value

export const SelectField = (props) => {

//    const [field, meta] = useField(props);
    const [options] = useState(props.options);

    let errorClassName =
        props.errorClassName ? props.errorClassName : "alert alert-danger";
    let fieldClassName =
        props.fieldClassName ? props.fieldClassName : "col-9";
    let labelClassName =
        props.labelClassName ? props.labelClassName : "col-3";

    return (
        <Container fluid>
            <Row className="mb-1">
                <Col className={labelClassName}>
                    <label htmlFor={props.name}>
                        {props.label}
                    </label>
                </Col>
                <Field
                    as="select"
                    autoFocus={props.autoFocus ? props.autoFocus : null}
                    className={fieldClassName}
                    id={props.name}
                    name={props.name}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.description}
                        </option>

                    ))}
                </Field>
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
    );
}

// TextField -----------------------------------------------------------------

// autoFocus                Set automatic focus to this field on render [not set]
// errorClassName           CSS styles for error message [alert alert-danger]
// fieldClassName           CSS styles for the field column [col-10]
// label                    Textual label for this field
// labelClassName           CSS styles for label column [col-2]
// name                     Field name in the containing object
// type                     Field type [text]

export const TextField = (props) => {

//    const [field, meta] = useField(props);
    let errorClassName =
        props.errorClassName ? props.errorClassName : "alert alert-danger";
    let fieldClassName =
        props.fieldClassName ? props.fieldClassName : "col-9";
    let labelClassName =
        props.labelClassName ? props.labelClassName : "col-3";
    let type = props.type ? props.type : "text";

    return (
        <Container fluid>
            <Row className="mb-1">
                <Col className={labelClassName}>
                    <label htmlFor={props.name}>
                        {props.label}
                    </label>
                </Col>
                <Col className={fieldClassName}>
                    <Field
                        autoFocus={props.autoFocus ? props.autoFocus : null}
                        className={fieldClassName}
                        id={props.name}
                        name={props.name}
                        type={type}
                    />
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
    );
}

