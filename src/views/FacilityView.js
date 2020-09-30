import React, { useContext, useEffect, useState } from "react";

import FacilityClient from "../clients/FacilityClient";
import { AddButton } from "../components/buttons";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import { FacilityContext } from "../contexts/FacilityContext";
import FacilityModal from "../modals/FacilityModal";

const FacilityView = () => {

    const facilityContext = useContext(FacilityContext);

    const [adding, setAdding] = useState(false);
    const [index, setIndex] = useState(-1);
    const [items, setItems] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        retrieveAllItems();
    }, []);

    const handleHide = () => {
        console.log("FacilityView.handleHide()");
//        handleSelectedItem(-1);
        setIndex(-1);
        setAdding(false);
//            setShowModal(false);  // Modal already hid itself
    }

    const handleInsert = (facility) => {
        console.log("FacilityView.handleInsert(" +
            JSON.stringify(facility, ["id", "name"]) + ")");
        setAdding(false);
        setShowModal(false);
        retrieveItems(searchText);
        facilityContext.refreshFacilities();
    }

    const handleRemove = (facility) => {
        console.log("FacilityView.handleRemove(" +
            JSON.stringify(facility, ["id", "name"]) + ")");
        setShowModal(false);
        retrieveItems(searchText);
        facilityContext.refreshFacilities();
    }

    const handleSelectedItem = (newIndex) => {
        if (newIndex === index) {
            console.log("FacilityView.handleSelectedItem(-1)");
            setIndex(-1);
            setAdding(false);
            setShowModal(false);
        } else {
            console.log("FacilityView.handleSelectedItem(" + newIndex + ", " +
                JSON.stringify(items[newIndex], ["id", "name"]) + ")");
            setIndex(newIndex);
            setAdding(false);
            setShowModal(true);
        }
    }

    const handleUpdate = (facility) => {
        console.log("FacilityView.handleUpdate(" +
            JSON.stringify(facility, ["id", "name"]) + ")");
        setAdding(false);
        setShowModal(false);
        retrieveItems(searchText);
        facilityContext.refreshFacilities();
    }

    const onAdd = () => {
        console.log("FacilityView.onAdd()");
        setAdding(true);
        setShowModal(true);
    }

   const onSearchChange = (event) => {
        console.log("FacilityView.onSearchChange(" + event.target.value + ")");
        setSearchText(event.target.value);
        retrieveItems(event.target.value);
    }

    const onSearchClick = () => {
        console.log("FacilityView.onSearchClick()");
        retrieveItems(searchText);
    }

    const retrieveAllItems = () => {
        FacilityClient.all()
            .then(response => {
                console.log("FacilityView.retrieveAllItems(" +
                    JSON.stringify(response.data, ["id", "name"]) + ")");
                setItems(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        setIndex(-1);
    }

    const retrieveItems = (newSearchText) => {
        if (newSearchText === "") {
            retrieveAllItems();
        } else {
            retrieveMatchingItems(newSearchText);
        }
    }

    const retrieveMatchingItems = (newSearchText) => {
        FacilityClient.findByName(newSearchText)
            .then(response => {
                console.log("FacilityView.retrieveMatchingItems(" +
                    JSON.stringify(response.data, ["id", "name"]) + ")");
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
                <div className="col-4">
                    <strong>Facilities</strong>
                    <AddButton onClick={onAdd}/>
                </div>
                <div className="col-8">
                    <SearchBar
                        onChange={onSearchChange}
                        onClick={onSearchClick}
                        placeholder="Search by name ..."
                        value={searchText}
                        withClear
                        withSearch
                    />
                </div>
                <p/>
            </div>

            <div className="row">

                <div className="col">
                    <List
                        fields={["name", "city", "state", "zipCode", "phone", "email"]}
                        handleSelect={handleSelectedItem}
                        headers={["Name", "City", "State", "Zip Code", "Phone Number",
                            "Email Address"]}
                        index={index}
                        items={items}
                    />
                </div>

            </div>

            { (showModal) ? (
                <div className={"col"}>
                    <FacilityModal
                        facility={(adding ? null : items[index])}
                        handleHide={handleHide}
                        handleInsert={handleInsert}
                        handleRemove={handleRemove}
                        handleUpdate={handleUpdate}
                        show={true}
                    />
                </div>
            ) : ( <div/> )
            }

        </div>

    );

};

export default FacilityView;
