import React, { useState } from "react";

// props.text - Message text to be displayed, or null for nothing
// props.type - "success", "info", "warning", "danger" ["info"]
export const Message = (props) => {

    const [text, setText] = useState(props.text);
    const [type, setType] = useState(props.type ? props.type : "info");

    return (

        <div className="row">
            { (text !== null) ? (
                <div className={"alert alert-{type}"}>
                    <div className={"alert alert-{type}"}>
                        {text}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>

    )

}

