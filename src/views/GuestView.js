import React, { useContext, useEffect, useState } from "react";

import FacilityClient from "../clients/FacilityClient";
import { AddButton } from "../components/buttons";
import List from "../components/List";
import { FacilityContext } from "../contexts/FacilityContext";
import GuestForm from "../forms/GuestForm";

const GuestView = () => {

    const facilityContext = useContext(FacilityContext);

    const [adding, setAdding] = useState(null);
    const [index, setIndex] = useState(-1);
    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log("GuestView.useEffect(" +
            JSON.stringify(facilityContext.selectedFacility,
                ["id", "firstName", "lastName"]) + ")");
        retrieveAllItems(facilityContext.selectedFacility);
    }, [facilityContext.selectedFacility]);


    const handleInsert = (guest) => {
        console.log("GuestView.handleInsert(" +
            JSON.stringify(guest, ["id", "firstName", "lastName"]) + ")");
        setAdding(null);
        retrieveAllItems(facilityContext.selectedFacility);
    }

    const handleRemove = (guest) => {
        console.log("GuestView.handleRemove(" +
            JSON.stringify(guest, ["id", "name", "lastName"]) + ")");
        retrieveAllItems(facilityContext.selectedFacility);
    }

    const handleSelectedItem = (newIndex) => {
        if (newIndex === index) {
            console.log("GuestView.handleSelectedItem(-1)");
            setIndex(-1);
        } else {
            console.log("GuestView.handleSelectedItem(" + newIndex + ", " +
                JSON.stringify(items[newIndex], ["id", "firstName", "lastName"]) + ")");
            setIndex(newIndex);
        }
        setAdding(null);
    }

    const handleUpdate = (guest) => {
        console.log("GuestView.handleUpdate(" +
            JSON.stringify(guest, ["id", "firstName", "lastName"]) + ")");
        retrieveAllItems(facilityContext.selectedFacility);
    }

    const onAdd = () => {
        console.log("GuestView.onAdd()");
        setAdding("true");
    }

    const retrieveAllItems = (newSelectedFacility) => {

        console.log("GuestView.retrieveAllItems for(" +
            JSON.stringify(newSelectedFacility, ["id", "name"]) + ")");
        FacilityClient.findGuestsByFacilityId(newSelectedFacility.id)
            .then(response => {
                console.log("GuestView.retrieveAllItems got(" +
                    JSON.stringify(response.data,
                        ["id", "firstName", "lastName"]) + ")");
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
                    <h4>Guests for {facilityContext.selectedFacility.name}</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-5">
                    <AddButton onClick={onAdd}/>
                    <p/>
                    <List
                        fields={["firstName", "lastName"]}
                        handleSelect={handleSelectedItem}
                        headers={["First Name", "Last Name"]}
                        index={index}
                        items={items}
                    />
                </div>

                <div className="col-7">
                    { (adding || (index >= 0)) ? (
                        <GuestForm
                            initialValues={(adding ? null : items[index])}
                            handleInsert={handleInsert}
                            handleRemove={handleRemove}
                            handleUpdate={handleUpdate}
                        />
                    ) : (
                        <div>
                            <p>Please click on a Guest or press Add ...</p>
                        </div>
                    )}
                </div>

            </div>

        </div>

    );

}

export default GuestView;
