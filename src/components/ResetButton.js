import React from "react";
import Button from "react-bootstrap/Button";

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

export default ResetButton;
