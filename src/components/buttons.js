import React from "react";

// props.className CSS styles for this button [btn]
// props.disabled Set if button should be disabled [not set]
// props.label Label for this button [Label Me!]
// props.onClick Handler for click events [none]
// props.type Button type [button]
export const Button = (props) => {
    return (
        <button
            className={props.className ? props.className : "btn"}
            disabled={props.disabled ? props.disabled : null}
            onClick={props.onClick}
            type={props.type ? props.type : "button"}
        >
            {props.label ? props.label : "Label Me!"}
        </button>
    );
}

export const AddButton = (props) => {
    return (
        <Button
            className="btn btn-primary btn-sm ml-1 mr-1"
            disabled={props.disabled ? props.disabled : null}
            label={props.label ? props.label : "Add"}
            onClick={props.onClick}
        />
    );
}

export const CancelButton = (props) => {
    return (
        <Button
            className="btn btn-secondary btn-sm ml-1 mr-1"
            disabled={props.disabled ? props.disabled : null}
            label={props.label ? props.label : "Cancel"}
            onClick={props.onClick}
            type="reset"
        />
    );
}

export const ClearButton = (props) => {
    return (
        <Button
            className="btn btn-outline-secondary"
            disabled={props.disabled ? props.disabled : null}
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
            disabled={props.disabled ? props.disabled : null}
            label={props.label ? props.label : "Remove"}
            onClick={props.onClick}
        />
    );
}

export const SaveButton = (props) => {
    return (
        <Button
            className="btn btn-primary btn-sm ml-1 mr-1"
            disabled={props.disabled ? props.disabled : null}
            label={props.label ? props.label : "Save"}
            onClick={props.onClick}
            type="submit"
        />
    );
}

export const SearchButton = (props) => {
    return (
        <Button
            className="btn btn-outline-primary ml-1 mr-1"
            disabled={props.disabled ? props.disabled : null}
            label={props.label ? props.label : "Search"}
            onClick={props.onClick}
        />
    );
}

// export default Button;
