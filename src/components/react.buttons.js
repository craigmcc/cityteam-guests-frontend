import React from "react";
import Button from "react-bootstrap/Button";

// RemoveButton --------------------------------------------------------------

// disabled                 Should this button be disabled? [none]
// label                    Label text [Remove]
// onClick                  Handler (event) for a click on this button [none]
// size                     Size of this button (sm, lg) [sm]
// type                     Button type [button]
// variant                  Variant style [danger]

export const RemoveButton = (props) => {

    return (
        <Button
            disabled={props.disabled ? props.disabled : null}
            onClick={props.onClick ? props.onClick : null}
            size={props.size ? props.size : "sm"}
            type={props.type ? props.type : "button"}
            variant={props.variant ? props.variant : "danger"}
        >
            {props.label ? props.label : "Remove"}
        </Button>
    );

}

// ResetButton ---------------------------------------------------------------

// disabled                 Should this button be disabled? [none]
// label                    Label text [Reset]
// onClick                  Handler (event) for a click on this button [none]
// size                     Size of this button (sm, lg) [sm]
// type                     Button type [reset]
// variant                  Variant style [secondary]

export const ResetButton = (props) => {

    return (
        <Button
            disabled={props.disabled ? props.disabled : null}
            onClick={props.onClick ? props.onClick : null}
            size={props.size ? props.size : "sm"}
            type={props.type ? props.type : "reset"}
            variant={props.variant ? props.variant : "secondary"}
        >
            {props.label ? props.label : "Reset"}
        </Button>
    );

}

// SaveButton ----------------------------------------------------------------

// disabled                 Should this button be disabled? [none]
// label                    Label text [Save]
// onClick                  Handler (event) for a click on this button [none]
// size                     Size of this button (sm, lg) [sm]
// type                     Button type [submit]
// variant                  Variant style [primary]

export const SaveButton = (props) => {

    return (
        <Button
            disabled={props.disabled ? props.disabled : null}
            onClick={props.onClick ? props.onClick : null}
            size={props.size ? props.size : "sm"}
            type={props.type ? props.type : "submit"}
            variant={props.variant ? props.variant : "primary"}
        >
            {props.label ? props.label : "Save"}
        </Button>
    );

}

