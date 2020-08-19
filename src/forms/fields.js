import React from "react";
import { ErrorMessage, Field, useField } from "formik";

// props.errorClassName CSS styles for error message [alert alert-danger] // TODO - need "col"?
// props.fieldClassName CSS styles for the field column [col-10]
// props.label Textual label for this field
// props.labelClassName CSS styles for label column [col-2]
// props.name Field name in the containing object
// props.type Field type [text]
export const TextField = (props) => {

//    const [field, meta] = useField(props);
    let errorClassName = props.errorClassName ? props.errorClassName : "alert alert-danger";
    let fieldClassName = props.fieldClassName ? props.fieldClassName : "col-10";
    let labelClassName = props.labelClassName ? props.labelClassName : "col-2";
    let type = props.type ? props.type : "text";

    return (
        <div className="form-group">
            <div className="row">
                <label className={labelClassName} htmlFor={props.name}>
                    {props.label}
                </label>
                <Field
                    className={fieldClassName}
                    id={props.name}
                    name={props.name}
                    type={type}
                />
            </div>
            <div className="row">
                <div className={labelClassName}></div>
                <ErrorMessage
                    className={errorClassName}
                    name={props.name}
                />
            </div>
        </div>
    );
}

// Convert null field values in incoming to empty strings
export const toEmptyStrings = (incoming) => {
    let outgoing = { };
    for (const [key, value] of Object.entries(incoming)) {
        if (value !== null) {
            outgoing[key] = value;
        } else {
            outgoing[key] = "";
        }
    }
    return outgoing;
}

// Convert empty string values in incoming to nulls
export const toNullValues = (incoming) => {
    let outgoing = { };
    for (const [key, value] of Object.entries(incoming)) {
        if (value === "") {
            outgoing[key] = null;
        } else {
            outgoing[key] = value;
        }
    }
    return outgoing;
}

