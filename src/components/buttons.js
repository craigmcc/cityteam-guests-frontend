import React /* , { useEffect, useState } */ from "react";

// For all of the specific button types, you can optionally override
// the default label by passing "label" prop.
export const Button = (props) => {
    return (
        <button
            className={props.className ? props.className : "btn"}
            onClick={props.onClick}
            type="button"
        >
            {props.label ? props.label : "Label Me!"}
        </button>
    );
}

export const AddButton = (props) => {
    return (
        <Button
            className="btn btn-primary btn-sm ml-1 mr-1"
            label={props.label ? props.label : "Add"}
            onClick={props.onClick}
        />
    );
}

export const CancelButton = (props) => {
    return (
        <Button
            className="btn btn-secondary btn-sm ml-1 mr-1"
            label={props.label ? props.label : "Cancel"}
            onClick={props.onClick}
        />
    );
}

export const ClearButton = (props) => {
    return (
        <Button
            className="btn btn-outline-secondary"
            label={props.label ? props.label : "X"}
            onClick={props.onClick}
        />
    );
}

export const RemoveButton = (props) => {
    // Initial example used "badge badge-danger mr-2"
    return (
        <Button
            className="btn btn-danger btn-sm ml-1 mr-1"
            label={props.label ? props.label : "Remove"}
            onClick={props.onClick}
        />
    );
}

export const SaveButton = (props) => {
    return (
        <Button
            className="btn btn-primary btn-sm ml-1 mr-1"
            label={props.label ? props.label : "Save"}
            onClick={props.onClick}
        />
    );
}

export const SearchButton = (props) => {
    return (
        <Button
            className="btn btn-outline-primary ml-1 mr-1"
            label={props.label ? props.label : "Search"}
            onClick={props.onClick}
        />
    );
}

/*
export default {
    CancelButton,
    ClearButton,
    RemoveButton,
    SaveButton,
    SearchButton
}
*/

export default Button;
