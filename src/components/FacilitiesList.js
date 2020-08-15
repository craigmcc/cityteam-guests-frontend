import React from "react";

// props.index Zero-relative index of selected item, or -1 for none
// props.items List of items to be represented as rows in the list.
// props.onSelect Handle (index) for item being selected
const FacilitiesList = (props) => {

    console.log("FacilitiesList index=" + props.index);
    console.log("FacilitiesList items=" +
        JSON.stringify(props.items, ["id", "name"]));

    return (

        <table className="table table-bordered table-sm">

            <thead>
                <tr className="table-secondary">
                    <th scope="col">Name</th>
                    <th scope="col">State</th>
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
                    <td>{item.name}</td>
                    <td>{item.state}</td>
                </tr>
            ))}
            </tbody>

        </table>

    );

}

export default FacilitiesList;
