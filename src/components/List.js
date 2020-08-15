import React from "react";

// props.fields Array of Strings containing field names
//   to extract from items for each row
// props.headers Array of Strings for column headers
// props.index Zero-relative index of selected item, or -1 for none
// props.items Array of items to be represented as rows in the list.
// props.onSelect Handle (index) for item being selected
const List = (props) => {

//    console.log("List index=" + props.index);
//    console.log("List items=" +
//        JSON.stringify(props.items));

    return (

        <table className="table table-bordered table-sm">

            <thead>
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
                    onClick={() => props.onSelect(index)}
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
