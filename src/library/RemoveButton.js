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

export default RemoveButton;
