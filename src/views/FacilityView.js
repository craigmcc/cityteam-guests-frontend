import React, { useContext, useEffect, useState } from "react";

import FacilityClient from "../clients/FacilityClient";
import { AddButton } from "../components/buttons";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import { FacilityContext } from "../contexts/FacilityContext";
import FacilityForm from "../forms/FacilityForm";

const FacilityView = () => {

    const facilityContext = useContext(FacilityContext);

    const [adding, setAdding] = useState(null);
    const [index, setIndex] = useState(-1);
    const [items, setItems] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        retrieveAllItems();
    }, []);

    const handleInsert = (facility) => {
        console.log("FacilityContext.handleInsert(" +
            JSON.stringify(facility, ["id", "name"]) + ")");
        setAdding(null);
        retrieveItems(searchText);
        facilityContext.refreshFacilities();
    }

    const handleRemove = (facility) => {
        console.log("FacilityView.handleRemove(" +
            JSON.stringify(facility, ["id", "name"]) + ")");
        retrieveItems(searchText);
        facilityContext.refreshFacilities();
    }

    const handleSelectedItem = (newIndex) => {
        if (newIndex === index) {
            console.log("FacilityView.handleSelectedItem(-1)");
            setIndex(-1);
        } else {
            console.log("FacilityView.handleSelectedItem(" + newIndex +
                ", " + JSON.stringify(items[newIndex]) + ")");
            setIndex(newIndex);
        }
        setAdding(null);
    }

    const handleUpdate = (facility) => {
        console.log("FacilityView.handleUpdate(" +
            JSON.stringify(facility, ["id", "name"]) + ")");
        setAdding(null);
        retrieveItems(searchText);
        facilityContext.refreshFacilities();
    }

    const onAdd = () => {
        console.log("FacilityView.onAdd()");
        setAdding("true");
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

        <div className={"container"}>

            <div className="row mt-2 mb-2">
                <div className="col-4">
                    <h4>Facilities</h4>
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

                <div className="col-4">
                    <AddButton onClick={onAdd}/>
                    <p/>
                    <List
                        fields={["name", "state", "zipCode"]}
                        handleSelect={handleSelectedItem}
                        headers={["Name", "State", "Zip Code"]}
                        index={index}
                        items={items}
                    />
                </div>

                <div className="col-8">
                    { (adding || (index >= 0)) ? (
                        <FacilityForm
                            handleInsert={handleInsert}
                            handleRemove={handleRemove}
                            handleUpdate={handleUpdate}
                            initialValues={(adding ? null : items[index])}
                        />
                    ) : (
                        <div>
                            <p>Please click on a Facility or press Add ...</p>
                        </div>
                    )}
                </div>

            </div>

        </div>

    );

};

export default FacilityView;
