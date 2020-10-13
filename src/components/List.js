import React from "react";

// props.fields Array of Strings containing field names
//   to extract from items for each row
// props.handleSelect Optional handle (index) for item being selected [none]
// props.headers Array of Strings for column headers
// props.heading Optional extra header, to render above column headers
// props.index Zero-relative index of selected item, or -1 for none
// props.items Array of items to be represented as rows in the list.
const List = (props) => {

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
                        >{item[field]}</td>
                    ))}
                </tr>
            ))}
            </tbody>

        </table>

    );

}

export default List;
