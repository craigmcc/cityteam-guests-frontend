import React from "react";
import Col from "react-bootstrap/Col";
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import ActionButton from "./ActionButton";

// CheckboxElement -----------------------------------------------------------

// Renders up to three <Col> components, all within a single <Row>:
// - Empty <Col> with "labelClassName" modifier, since actual label will be
//   rendered just after the checkbox element itself.  This makes it easy to
//   line up elements in (for example) a form, where all the labelClassName
//   values can be consistent.
// - <Col> element with "fieldClassName" modifier, which contains:
//   - The checkbox element itself (with "fieldName" or default).
//   - The "label" text (which would appear in the first column for text elements)
//     if "label" exists.
// - <Col> element with "actionClassName" modifier, if "action" exists,
//   and containing an action button.

// Incoming Properties -------------------------------------------------------

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
// onBlur                   Handle (event) for leaving input element [no handler]
// onChange                 Handle (event) for input element value change [no handler]
// onClick                  Handle (event) for action button click [no handler]
// onKeyDown                Handle (event) for key being pressed [no handler]
// withoutInputClassName    Leave off the default className on the input element

// Component Details ---------------------------------------------------------

const CheckboxElement = (props) => {

    let fieldName = (props.fieldName) ? props.fieldName : "checkbox";

    return (
        // <Container fluid>
        <Row className={props.elementClassName ? props.elementClassName : "mt-1 mb-1 col-12"}>
            {props.label ? (
                <Col className={props.labelClassName ? props.labelClassName : null}/>
            ) : null }
            <Col className={props.fieldClassName ? props.fieldClassName : null}>
                <input
                    autoFocus={props.autoFocus ? props.autoFocus : null}
                    checked={props.fieldValue}
                    className={props.withoutInputClassName ? null : "mr-2"}
                    disabled={props.disabled ? props.disabled : null}
                    id={fieldName}
                    name={fieldName}
                    onBlur={props.onBlur ? props.onBlur : null}
                    onKeyDown={props.onKeyDown ? props.onKeyDown : null}
                    onChange={props.onChange ? props.onChange : null}
                    type="checkbox"
                />
                {props.label ? (
                    <label htmlFor={fieldName}>
                        {props.label}
                    </label>
                ) : null }
            </Col>
            {props.action ? (
                <Col className={props.actionClassName ? props.actionClassName : null}>
                    <ActionButton
                        disabled={props.disabled ? props.disabled : null}
                        label={props.action}
                        onClick={props.onClick ? props.onClick : null}
                        size={props.actionSize ? props.actionSize : "sm"}
                        variant={props.actionVariant ? props.actionVariant : null}
                    />
                </Col>
            ) : null }
        </Row>
        // </Container>
    )

}

export default CheckboxElement;
