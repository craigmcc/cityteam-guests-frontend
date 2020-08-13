import React, { useState } from "react";

// props.items List of items to be represented as rows in the list (REQUIRED)
// props.onClick Optionally handle (item, index) for item being selected,
//   or (null, -1) for item being unselected [Not forwarded]
const FacilitiesList = (props) => {

    const forwardClick = props.onClick;
    const items = props.items;

    const [currentItem, setCurrentItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const onClick = (item, index) => {
        if (currentIndex === index) {
            console.log("FacilitiesList.onClick(name=" + item.name +
                ", index=" + index + ", off");
            setCurrentItem(null);
            setCurrentIndex(-1);
        } else {
            console.log("FacilitiesList.onClick(name=" + item.name +
                ", index=" + index + ", on");
            setCurrentItem(item);
            setCurrentIndex(index);
        }
        if (forwardClick) {
            console.log("FacilitiesList.onClick.forward(name=" +
                (currentItem ? currentItem.name : "<none>") +
                ", index=" + currentIndex + ")");
            forwardClick(currentItem, currentIndex);
        }
    }

    return (

        <table className="table table-bordered table-sm">

            <thead>
                <tr className="table-secondary">
                    <th scope="col">Name</th>
                    <th scope="col">State</th>
                </tr>
            </thead>

            <tbody>
            {items.map((item, index) => (
                <tr
                    className={"table-" +
                        (index === currentIndex ? "primary" : "default")}
                    key={index}
                    onClick={() => onClick(item, index)}
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
