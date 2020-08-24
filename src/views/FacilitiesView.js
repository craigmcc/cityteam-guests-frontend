import React, { useEffect, useState } from "react";

import { AddButton } from "../components/buttons";
import FacilityClient from "../clients/FacilityClient";
import FacilityForm from "../forms/FacilityForm";
import FacilitySelector from "../components/FacilitySelector";
import List from "../components/List";
import SearchBar from "../components/SearchBar";

// import { Link } from "react-router-dom";

const FacilitiesView = () => {

    const [adding, setAdding] = useState(null);
    const [index, setIndex] = useState(-1);
    const [items, setItems] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        retrieveAllItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAdd = () => {
        console.log("FacilitiesView.onAdd()");
        setAdding("true");
    }

    const onRemove = () => {
        console.log("FacilitiesView.onRemove(index=" + index + ")");
        retrieveItems(searchText);
    }

    const onSave = () => {
        console.log("FacilitiesView.onSave()");
        setAdding(null);
        retrieveItems(searchText);
    }

    const onSearchChange = event => {
        console.log("FacilitiesView.onSearchChange(" + event.target.value + ")");
        setSearchText(event.target.value);
        retrieveItems(event.target.value);
    }

    const onSearchClick = () => {
        console.log("FacilitiesView.onSearchClick()");
        retrieveItems(searchText);
    }

    const onSelectItem = (newIndex) => {
        if (newIndex === index) {
            console.log("FacilitiesView.onSelectItem(-1)");
            setIndex(-1);
        } else {
            console.log("FacilitiesView.onSelectItem(" + newIndex + ")");
            console.log("  items[" + newIndex + "] = " +
                items[newIndex].name);
            setIndex(newIndex);
        }
        setAdding(null);
    }

    const retrieveAllItems = () => {
        FacilityClient.all()
            .then(response => {
                console.log("FacilitiesView.retrieveAllItems(" +
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
                console.log("FacilitiesView.retrieveMatchingItems(" +
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
                        headers={["Name", "State", "Zip Code"]}
                        index={index}
                        items={items}
                        onSelect={onSelectItem}
                    />

                    <FacilitySelector/>

                </div>

                <div className="col-8">

                    { (adding || (index >= 0)) ? (
                        <FacilityForm
                            initialValues={(adding ? null : items[index])}
                            onRemove={onRemove}
                            onSave={onSave}
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

export default FacilitiesView;
