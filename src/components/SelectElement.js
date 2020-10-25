import React from "react";
import Col from "react-bootstrap/Col";
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

// SelectElement -------------------------------------------------------------

// Renders up to three <Col> components, all within a single <Row>:
// - Element label (if "label" is provided), with optional "labelClassName" modifier
// - Select element itself (with "name" or default), with optional "fieldClassName" modifier
// - Action button (if "action" is provided), with optional "actionClassName" and "actionVariant"

// Incoming Properties -------------------------------------------------------

// autoFocus                Set automatic focus to this element on render [not set]
// action                   Action button text [no button is rendered]
// actionClassName          CSS styles for the action button <Col> element [not rendered]
// actionSize               Action button size ("lg", "sm") [sm]
// elementClassName         CSS styles for overall <Row> component [not rendered]
// fieldClassName           CSS styles for the field element <Col> element [not rendered]
// fieldDisabled            Mark input to this field as disabled [not disabled]
// fieldName                Element name (for label mapping) [select]
// fieldValue               Initially selected field value [not rendered]
// label                    Element label text [no label is rendered]
// labelClassName           CSS styles for the element label <Col> element [not rendered]
// onBlur                   Handle (event) for leaving input element [no handler]
// onChange                 Handle (event) for input element value change [no handler]
// onClick                  Handle (event) for action button click [no handler]
// options                  Array of options with "value" and "description fields
// withoutInputClassName    Leave off the default className on the input element

// Component Details ---------------------------------------------------------

const SelectElement = (props) => {

    let fieldName = (props.fieldName) ? props.fieldName : "select";

    return (
        // <Container fluid>
        <Row className={props.elementClassName ? props.elementClassName : "mt-1 mb-1 col-12"}>
            {props.label ? (
                <Col className={props.labelClassName ? props.labelClassName : null}>
                    <label htmlFor={fieldName}>
                        {props.label}
                    </label>
                </Col>
            ) : null }
            <Col className={props.fieldClassName ? props.fieldClassName : null}>
                <select
                    autoFocus={props.autoFocus ? props.autoFocus : null}
                    className={props.withoutInputClassName ? null : "form-control"}
                    disabled={props.disabled ? props.disabled : null}
                    id={fieldName}
                    name={fieldName}
                    onBlur={props.onBlur ? props.onBlur : null}
                    onChange={props.onChange ? props.onChange : null}
                    value={props.fieldValue ? props.fieldValue : null}
                >
                    {props.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.description}
                        </option>
                    ))}
                </select>
            </Col>
            {props.action ? (
                <Col className={props.actionClassName ? props.actionClassName : null}>
                    <Button
                        disabled={props.disabled ? props.disabled : null}
                        onClick={props.onClick ? props.onClick : null}
                        size={props.actionSize ? props.actionSize : "sm"}
                    >
                        {props.action}
                    </Button>
                </Col>
            ) : null }
        </Row>
        // </Container>
    )

}

export default SelectElement;
