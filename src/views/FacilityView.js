import React, { useEffect, useState } from "react";

import { AddButton } from "../components/buttons";
import FacilitySelector from "../components/FacilitySelector";
import List from "../components/List";
import SearchBar from "../components/SearchBar";

import FacilityClient from "../clients/FacilityClient";
import FacilityForm from "../forms/FacilityForm";

const FacilityView = () => {

    const [adding, setAdding] = useState(null);
    const [index, setIndex] = useState(-1);
    const [items, setItems] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        retrieveAllItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRemove = (facility) => {
        console.log("FacilityView.handleRemove(" +
            JSON.stringify(facility) + ")");
        retrieveItems(searchText);
    }

    const handleSave = (facility) => {
        console.log("FacilityView.handleSave(" +
            JSON.stringify(facility) + ")");
        setAdding(null);
        retrieveItems(searchText);
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

    const onAdd = () => {
        console.log("FacilityView.onAdd()");
        setAdding("true");
    }

    const onSearchChange = event => {
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

            <div className="row">
                <div className="col-lg-2">
                    <h4>Facilities</h4>
                </div>
                <div className="col-lg">
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

                    <FacilitySelector/>

                </div>

                <div className="col-8">

                    { (adding || (index >= 0)) ? (
                        <FacilityForm
                            initialValues={(adding ? null : items[index])}
                            handleRemove={handleRemove}
                            handleSave={handleSave}
                        />
                    ) : (
                        <div>
                            <p>Please click on a Facility ...</p>
                        </div>
                    )}
                </div>

            </div>

        </div>

    );

};

export default FacilityView;
