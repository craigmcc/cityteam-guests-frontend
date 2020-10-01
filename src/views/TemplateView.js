import React, { useContext, useEffect, useState } from "react";

import FacilityClient from "../clients/FacilityClient";
import { AddButton } from "../components/buttons";
import List from "../components/List";
import { FacilityContext } from "../contexts/FacilityContext";
import TemplateModal from "../modals/TemplateModal";

const TemplateView = () => {

    const facilityContext = useContext(FacilityContext);

    const [adding, setAdding] = useState(null);
    const [index, setIndex] = useState(-1);
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        retrieveAllItems();
        // eslint-disable-next-line
    }, [facilityContext.selectedFacility]);

    const handleHide = () => {
        console.log("TemplateView.handleHide()");
//        handleSelectedItem(-1);
        setIndex(-1);
        setAdding(false);
//            setShowModal(false);  // Modal already hid itself
    }
    const handleInsert = (template) => {
        console.log("TemplateView.handleInsert(" +
            JSON.stringify(template, ["id", "name"]) + ")");
        setAdding(null);
        setShowModal(false);
        retrieveAllItems();
    }

    const handleRemove = (template) => {
        console.log("TemplateView.handleRemove(" +
            JSON.stringify(template, ["id", "name"]) + ")");
        setShowModal(false);
        retrieveAllItems();
    }

    const handleSelectedItem = (newIndex) => {
        if (newIndex === index) {
            console.log("TemplateView.handleSelectedItem(-1)");
            setIndex(-1);
            setAdding(false);
            setShowModal(false);
        } else {
            console.log("TemplateView.handleSelectedItem(" + newIndex + ", " +
                JSON.stringify(items[newIndex], ["id", "name"]) + ")");
            setIndex(newIndex);
            setAdding(false);
            setShowModal(true);
        }
        setAdding(null);
    }

    const handleUpdate = (template) => {
        console.log("TemplateView.handleUpdate(" +
            JSON.stringify(template, ["id", "name"]) + ")");
        setAdding(false);
        setShowModal(false);
        retrieveAllItems();
    }

    const onAdd = () => {
        console.log("TemplateView.onAdd()");
        setAdding(true);
        setShowModal(true);
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

        <div className="container fluid">

            <div className="row mt-2 mb-3">
                <div className="col">
                    <strong>Templates for {facilityContext.selectedFacility.name}</strong>
                    <AddButton onClick={onAdd}/>
                </div>
            </div>

            <div className="row">

                <div className="col">
                    <List
                        fields={["name", "allMats", "handicapMats", "socketMats"]}
                        handleSelect={handleSelectedItem}
                        headers={["Name", "All Mats", "Handicap Mats", "Socket Mats"]}
                        index={index}
                        items={items}
                    />
                </div>

            </div>

            { (showModal) ? (
                <div className={"col"}>
                    <TemplateModal
                        handleHide={handleHide}
                        handleInsert={handleInsert}
                        handleRemove={handleRemove}
                        handleUpdate={handleUpdate}
                        show={true}
                        template={(adding ? null : items[index])}
                    />
                </div>
            ) : ( <div/> )
            }

        </div>

    );

}

export default TemplateView;
