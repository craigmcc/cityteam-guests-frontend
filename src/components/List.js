import React, { useState } from "react";

// fields       Array of Strings containing field names
//              to extract from items for each row
// booleanFalse Text to display for boolean false [No]
// booleanTrue  Text to display for boolean true [Yes]
// handleSelect Optional handle (index) for item being selected [none]
// headers      Array of Strings for column headers
// heading      Optional extra header, to render above column headers
// index        Zero-relative index of selected item, or -1 for none
// items        Array of items to be represented as rows in the list.
// showFooter   Show the table footer?  [false]
const List = (props) => {

    const [ booleanFalse ] = useState(props.booleanFalse || "No");
    const [ booleanTrue ] = useState(props.booleanTrue || "Yes");

    let renderField = (field) => {
        if (typeof(field) === "boolean") {
            return field ? booleanTrue : booleanFalse;
        } else {
            return field;
        }
    }

    return (

        <table className="table table-bordered table-hover table-sm">

            <thead>
            { (props.heading) ? (
                <tr className="table-dark">
                    <th
                        className="text-center"
                        colSpan={props.headers.length}
                    >
                        {props.heading}
                    </th>
                </tr>
            ) : ( null ) }
            <tr className="table-secondary">
                {props.headers.map((header, index) => (
                    <th
                        key={-index}
                        scope="col"
                    >{header}</th>
                ))}
            </tr>
            </thead>

            <tbody>
            {props.items.map((item, index) => (
                <tr
                    className={"table-" +
                    (index === props.index ? "primary" : "default")}
                    key={index}
                    onClick={() => {
                        if (props.handleSelect) {
                            props.handleSelect(index)
                        }
                    }}
                >
                    {props.fields.map((field, index2) => (
                        <td
                            key={100 + (index * 100) + index2}
                        >{renderField(item[field])}</td>
                    ))}
                </tr>
            ))}
            </tbody>

            { (props.showFooter) ? (
                <tfoot>
                <tr className="table-secondary">
                    {props.headers.map((header, index) => (
                        <th
                            key={-index}
                            scope="col"
                        >{header}</th>
                    ))}
                </tr>
                </tfoot>

            ) : (
                null
            )}

        </table>

    );

}

export default List;
