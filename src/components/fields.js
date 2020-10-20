import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, /* useField */} from "formik";

// props.autoFocus Set automatic focus to this field on render [not set]
// props.errorClassName CSS styles for error message [alert alert-danger]
// props.fieldClassName CSS styles for the field column [col-1]
// props.label Textual label for this field
// props.labelClassName CSS styles for label column [col-2]
// props.name Field name in the containing object
export const CheckboxField = (props) => {

    let errorClassName =
        props.errorClassName ? props.errorClassName : "alert alert-danger";
    let fieldClassName =
        props.fieldClassName ? props.fieldClassName : "col-1";
    let labelClassName =
        props.labelClassName ? props.labelClassName : "col-2";

    return (
        <div className="form-group">
            <div className="row">
                <label
                    className={labelClassName + " form-check-label"}
                    htmlFor={props.name}
                >
                    {props.label}
                </label>
                <Field
                    autoFocus={props.autoFocus ? props.autoFocus : null}
                    className={fieldClassName}
                    id={props.name}
                    name={props.name}
                    type="checkbox"
                />
            </div>
            <div className="row mt-1">
                <div className={labelClassName}></div>
                <ErrorMessage
                    className={errorClassName}
                    component="div"
                    name={props.name}
                />
            </div>
        </div>
    );
}

// props.autoFocus      Set automatic focus to this field on render [not set]
// props.errorClassName CSS styles for error message [alert alert-danger]
// props.fieldClassName CSS styles for the field column [col-10]
// props.label          Textual label for this field
// props.labelClassName CSS styles for label column [col-2]
// props.name           Field name in the containing object
// props.options        Array of objects with "value" and "description" fields
// props.value          Currently selected value
export const SelectField = (props) => {

//    const [field, meta] = useField(props);
    let [options] = useState(props.options);

    useEffect(() => {
    }, [options])

    let errorClassName =
        props.errorClassName ? props.errorClassName : "alert alert-danger";
    let fieldClassName =
        props.fieldClassName ? props.fieldClassName : "col-10";
    let labelClassName =
        props.labelClassName ? props.labelClassName : "col-2";

    return (
        <div className="form-group">
            <div className="row">
                <label className={labelClassName} htmlFor={props.name}>
                    {props.label}
                </label>
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
            </div>
            <div className="row mt-1">
                <div className={labelClassName}></div>
                <ErrorMessage
                    className={errorClassName}
                    component="div"
                    name={props.name}
                />
            </div>
        </div>
    );
}

// props.autoFocus Set automatic focus to this field on render [not set]
// props.errorClassName CSS styles for error message [alert alert-danger]
// props.fieldClassName CSS styles for the field column [col-10]
// props.label Textual label for this field
// props.labelClassName CSS styles for label column [col-2]
// props.name Field name in the containing object
// props.type Field type [text]
export const TextField = (props) => {

//    const [field, meta] = useField(props);
    let errorClassName =
        props.errorClassName ? props.errorClassName : "alert alert-danger";
    let fieldClassName =
        props.fieldClassName ? props.fieldClassName : "col-10";
    let labelClassName =
        props.labelClassName ? props.labelClassName : "col-2";
    let type = props.type ? props.type : "text";

    return (
        <div className="form-group">
            <div className="row">
                <label className={labelClassName} htmlFor={props.name}>
                    {props.label}
                </label>
                <Field
                    autoFocus={props.autoFocus ? props.autoFocus : null}
                    className={fieldClassName}
                    id={props.name}
                    name={props.name}
                    type={type}
                />
            </div>
            <div className="row mt-1">
                <div className={labelClassName}></div>
                <ErrorMessage
                    className={errorClassName}
                    component="div"
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

// For each incoming item, copy it's fields to outgoing.  In addition, if the
// item has a field with key {name}, assume it is an object and add
// {name}.{subName} fields to the outgoing item for each field in the
// named object.  NOTE:  This only goes one level deep.
export const withFlattenedObject = (incoming, name) => {
//    console.log("wFO incoming is " +
//        JSON.stringify(incoming, null, 2));
    let outgoing = { };
    for (const [key, value] of Object.entries(incoming)) {
        outgoing[key] = value;
        if ((key === name) && (value)) {
//            console.log("Object value  is " + JSON.stringify(value, null, 2));
            for (let subName in value) {
//                console.log("  Adding [" + name + "." + subName + "] = " + value[subName]);
                outgoing[name + "." + subName] = value[subName];
            }
        }
    }
//    console.log("wFO outgoing is " +
//        JSON.stringify(outgoing, null, 2));
    return outgoing;
}

// Call withFlattenedObject for each item in incoming array, and return the
// resulting outgoing array
export const withFlattenedObjects = (incoming, name) => {
    if (incoming.length === 0) {
        return [];
    }
//    console.log("wFOs incoming is  " +
//        JSON.stringify(incoming, null, 2));
    let outgoing = [];
    for (let index = 0; index < incoming.length; index++) {
        outgoing.push(withFlattenedObject(incoming[index], name));
    }
//    console.log("wFOs outgoing is  " +
//        JSON.stringify(outgoing, null, 2));
    return outgoing;
}
