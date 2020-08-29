import React, { useContext, useEffect, useState } from "react";

import { AddButton } from "../components/buttons";
import List from "../components/List";

import FacilityClient from "../clients/FacilityClient";
import { FacilityContext } from "../contexts/FacilityContext";
import TemplateForm from "../forms/TemplateForm";

// props.selectedFacility The selected facility for which to display templates
const TemplateView = () => {

    const facilityContext = useContext(FacilityContext);

    const [adding, setAdding] = useState(null);
    const [index, setIndex] = useState(-1);
    const [items, setItems] = useState([]);
    const [selectedFacility, setSelectedFacility] =
        useState(facilityContext.selectedFacility);

    useEffect(() => {
        console.log("TemplateView.useEffect(" +
            JSON.stringify(facilityContext.selectedFacility,
                ["id", "name"]) + ")");
        retrieveAllItems(facilityContext.selectedFacility);
        setSelectedFacility(facilityContext.selectedFacility);
    }, [facilityContext.selectedFacility]);

    const handleRemove = (template) => {
        console.log("TemplateView.handleRemove(" +
            JSON.stringify(template, ["id", "name"]) + ")");
        retrieveAllItems(selectedFacility);
    }

    const handleSave = (template) => {
        console.log("TemplateView.handleSave(" +
            JSON.stringify(template, ["id", "name"]) + ")");
        setAdding(null);
        retrieveAllItems(selectedFacility);
    }

    const handleSelectedItem = (newIndex) => {
        if (newIndex === index) {
            console.log("TemplateView.handleSelectedItem(-1)");
            setIndex(-1);
        } else {
            console.log("TemplateView.handleSelectedItem(" + newIndex +
                ", " + JSON.stringify(items[newIndex], ["id", "name"]) + ")");
            setIndex(newIndex);
        }
        setAdding(null);
    }

    const onAdd = () => {
        console.log("TemplateView.onAdd()");
        setAdding("true");
    }

    const retrieveAllItems = (newSelectedFacility) => {

        console.log("TemplateView.retrieveAllItems for(" +
            JSON.stringify(newSelectedFacility, ["id", "name"]) + ")");
        FacilityClient.findTemplatesByFacilityId(newSelectedFacility.id)
            .then(response => {
                console.log("TemplateView.retrieveAllItems got(" +
                    JSON.stringify(response.data,
                        ["id", "name"]) + ")");
                setItems(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        setIndex(-1);

    }

    return (

        <div className={"container"}>

            <div className="row mt-2 mb-2">
                <div className="col-12">
                    <h4>Templates for {selectedFacility.name}</h4>
                </div>
            </div>

            <div className="row">

                <div className="col-4">
                    <AddButton onClick={onAdd}/>
                    <p/>
                    <List
                        fields={["name", "allMats"]}
                        handleSelect={handleSelectedItem}
                        headers={["Name", "All Mats"]}
                        index={index}
                        items={items}
                    />
                </div>

                <div className="col-8">
                    { (adding || (index >= 0)) ? (
                        <TemplateForm
                            initialValues={(adding ? null : items[index])}
                            handleRemove={handleRemove}
                            handleSave={handleSave}
                        />
                    ) : (
                        <div>
                            <p>Please click on a Template or press Add ...</p>
                        </div>
                    )}
                </div>

            </div>

        </div>

    );

}

export default TemplateView;
