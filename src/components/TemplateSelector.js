import React, { useContext, useEffect, useState } from "react";

import FacilityClient from "../clients/FacilityClient";
import { ActionButton } from "../components/buttons";
import { FacilityContext } from "../contexts/FacilityContext";

// props.actionLabel - Label for action button [Action]
// props.handleAction - Handle selected (template) when action button is clicked
export const TemplateSelector = (props) => {

    const facilityContext = useContext(FacilityContext);

    const [index, setIndex] = useState(0);
    const [items, setItems] = useState([]);

    useEffect( () => {
        retrieveAllItems();
        // eslint-disable-next-line
    }, [facilityContext.selectedFacility]);

    const onChange = (event) => {
        let newIndex = Number(event.target.value);
        console.log("TemplateSelector.onChange(" + newIndex + ", " +
            JSON.stringify(items[newIndex], ["id", "name"]) + ")");
        setIndex(newIndex);
    }

    const onClick = (event) => {
        console.log("TemplateSelector.onClick(" +
            JSON.stringify(items[index], ["id", "name"]) + ")");
        if (props.handleAction) {
            props.handleAction(items[index]);
        }
    }

    const retrieveAllItems = () => {

        console.log("TemplateSelector.retrieveAllItems for(" +
            JSON.stringify(facilityContext.selectedFacility,
                ["id", "name"]), 2)
        FacilityClient.findTemplatesByFacilityId
                (facilityContext.selectedFacility.id)
            .then(response => {
                console.log("TemplateSelector.retrieveAllItems got(" +
                    JSON.stringify(response.data, ["id", "name"]) + ")");
                setItems(response.data);
                setIndex(0);
            })
            .catch(e => {
                console.log(e);
            });

    }

    return (

        <div className="form-row">

            <div className="row form-group">

                <label
                    className="mr-2"
                    htmlFor="currentTemplate"
                >
                    Template:
                </label>

                <select
                    className="mr-2"
                    id="currentTemplate"
                    name="currentTemplate"
                    onChange={onChange}
                    value={index}
                >
                    {items.map((item, itemIndex) => (
                        <option
                            key={item.id}
                            onChange={onChange}
                            value={itemIndex}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>

                <div className="input-group-append">
                    <ActionButton
                        label="Generate"
                        onClick={onClick}
                    />
                </div>

            </div>
        </div>

    );

}

export default TemplateSelector;
