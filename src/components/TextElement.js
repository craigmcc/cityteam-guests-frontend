import React from "react";
import Col from "react-bootstrap/Col";
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

// TextElement ---------------------------------------------------------------

// Renders up to three <Col> components, all within a single <Row>:
// - Element label (if "label" is provided), with optional "labelClassName" modifier
// - Text element itself (with "name" or default), with optional "fieldClassName" modifier
// - Action button (if "action" is provided), with optional "actionClassName" and "actionVariant"

// Properties ----------------------------------------------------------------

// autoFocus                Set automatic focus to this element on render [not set]
// action                   Action button text [no button is rendered]
// actionClassName          CSS styles for the action button <Col> element [not rendered]
// actionSize               Action button size ("lg", "sm") [sm]
// actionVariant            Action style variant [not rendered]
// elementClassName         CSS styles for overall <Row> component [not rendered]
// fieldClassName           CSS styles for the field <Col> element [not rendered]
// fieldDisabled            Mark input to this field as disabled [not disabled]
// fieldName                Element name (for label mapping) [select]
// fieldValue               Initially selected field value [not rendered]
// label                    Element label text [no label is rendered]
// labelClassName           CSS styles for the element label <Col> element [not rendered]
// max                      Maximum allowed value [no restriction]
// maxLength                Maximum allowed number of characters [no restriction]
// min                      Minimum allowed value [no restriction]
// minLength                Minimum allowed number of characters [no restriction]
// onBlur                   Handle (event) for leaving input element [no handler]
// onChange                 Handle (event) for input element value change [no handler]
// onClick                  Handle (event) for action button click [no handler]
// onKeyDown                Handle (event) for key being pressed [no handler]
// pattern                  Matching regex pattern (see rules)
//                          for valid values [no restriction]
// placeholder              Placeholder expression when field is empty [not rendered]
// required                 Make this field required [no restriction]
// type                     Input element type (date, datetime-local, email, month,
//                          number, password, search, tel, text, time [text]
// withoutInputClassName    Leave off the default className on the input element

// Component Details ---------------------------------------------------------

const TextElement = (props) => {

    let fieldName = (props.fieldName) ? props.fieldName : "text";

    return (
//        <Container fluid>
        <Row className={props.elementClassName ? props.elementClassName : "mt-1 mb-1 col-12"}>
            {props.label ? (
                <Col className={props.labelClassName ? props.labelClassName : null}>
                    <label htmlFor={fieldName}>
                        {props.label}
                    </label>

                </Col>
            ) : null }
            <Col className={props.fieldClassName ? props.fieldClassName : null}>
                <input
                    autoFocus={props.autoFocus ? props.autoFocus : null}
                    className={props.withoutInputClassName ? null : "form-control"}
                    disabled={props.disabled ? props.disabled : null}
                    id={fieldName}
                    max={props.max ? props.max : null}
                    maxLength={props.maxLength ? props.maxLength : null}
                    min={props.min ? props.min : null}
                    minLength={props.minLength ? props.minLength: null}
                    name={fieldName}
                    onBlur={props.onBlur ? props.onBlur : null}
                    onKeyDown={props.onKeyDown ? props.onKeyDown : null}
                    onChange={props.onChange ? props.onChange : null}
                    pattern={props.pattern ? props.pattern : null}
                    placeholder={props.placeholder ? props.placeholder : null}
                    required={props.required ? props.required : null}
                    type={props.type ? props.type : "text"}
                    value={props.fieldValue ? props.fieldValue : null}
                />
            </Col>
            {props.action ? (
                <Col className={props.actionClassName ? props.actionClassName : null}>
                    <Button
                        onClick={props.onClick ? props.onClick : null}
                        size={props.actionSize ? props.actionSize : "sm"}
                        variant={props.actionVariant ? props.actionVariant : null}
                    >
                        {props.action}
                    </Button>
                </Col>
            ) : null }
        </Row>
//        </Container>
    )

}

export default TextElement;
