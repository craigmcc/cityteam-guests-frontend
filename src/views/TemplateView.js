import React, { useContext, useEffect, useState } from "react";

import FacilityClient from "../clients/FacilityClient";
import { AddButton } from "../components/buttons";
import List from "../components/List";
import { FacilityContext } from "../contexts/FacilityContext";
import TemplateForm from "../forms/TemplateForm";

const TemplateView = () => {

    const facilityContext = useContext(FacilityContext);

    const [adding, setAdding] = useState(null);
    const [index, setIndex] = useState(-1);
    const [items, setItems] = useState([]);

    useEffect(() => {
        retrieveAllItems();
    }, [facilityContext.selectedFacility]);

    const handleInsert = (template) => {
        console.log("TemplateView.handleInsert(" +
            JSON.stringify(template, ["id", "name"]) + ")");
        setAdding(null);
        retrieveAllItems();
    }

    const handleRemove = (template) => {
        console.log("TemplateView.handleRemove(" +
            JSON.stringify(template, ["id", "name"]) + ")");
        retrieveAllItems();
    }

    const handleSelectedItem = (newIndex) => {
        if (newIndex === index) {
            console.log("TemplateView.handleSelectedItem(-1)");
            setIndex(-1);
        } else {
            console.log("TemplateView.handleSelectedItem(" + newIndex + ", " +
                JSON.stringify(items[newIndex], ["id", "name"]) + ")");
            setIndex(newIndex);
        }
        setAdding(null);
    }

    const handleUpdate = (template) => {
        console.log("TemplateView.handleUpdate(" +
            JSON.stringify(template, ["id", "name"]) + ")");
        retrieveAllItems();
    }

    const onAdd = () => {
        console.log("TemplateView.onAdd()");
        setAdding("true");
    }

    const retrieveAllItems = () => {

        console.log("TemplateView.retrieveAllItems for(" +
            JSON.stringify(facilityContext.selectedFacility,
                ["id", "name"]) + ")");
        FacilityClient.findTemplatesByFacilityId
                (facilityContext.selectedFacility.id)
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

        <div className="container">

            <div className="row mt-2 mb-2">
                <div className="col-12">
                    <h4>Templates for {facilityContext.selectedFacility.name}</h4>
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
                            handleInsert={handleInsert}
                            handleRemove={handleRemove}
                            handleUpdate={handleUpdate}
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
