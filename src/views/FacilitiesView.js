import React, { useEffect, useState } from "react";
import { AddButton } from "../components/buttons";
import FacilityClient from "../clients/FacilityClient";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
// import { Link } from "react-router-dom";

const FacilitiesView = () => {

    const [index, setIndex] = useState(-1);
    const [items, setItems] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        retrieveAllItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAdd = () => {
        console.log("FacilitiesView.onAdd()");
        // TODO - set up for an add form, move focus
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
            // TODO - erase form
        } else {
            console.log("FacilitiesView.onSelectItem(" + newIndex + ")");
            setIndex(newIndex);
            console.log("  items[" + newIndex + "] = " +
                items[newIndex].name);
            // TODO - render form for newIndex (index won't be updated yet)
        }
    }

    const retrieveAllItems = () => {
        console.log("FacilitiesView.retrieveAllItems()");
        FacilityClient.all()
            .then(response => {
                console.log("FacilitiesView.retrieveAllItems: Found " +
                    JSON.stringify(response.data, ["id", "name"]));
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
        console.log("FacilitiesView.retrieveMatchingItems(" + newSearchText + ")");
        FacilityClient.findByName(newSearchText)
            .then(response => {
                console.log("FacilitiesView.retrieveMatchingItems: Found " +
                    JSON.stringify(response.data, ["id", "name"]));
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
                <div className="col-sm-2">
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

                <div className="col">

                    <AddButton onClick={onAdd}/>
                    <p/>

                    <List
                        fields={["name", "state", "zipCode"]}
                        headers={["Name", "State", "Zip Code"]}
                        index={index}
                        items={items}
                        onSelect={onSelectItem}
                    />

                </div>

                <div className="col">
                    Column 2 (Form)
                </div>

            </div>

        </div>

    );

};

export default FacilitiesView;
