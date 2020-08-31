import React, { useContext, useEffect, useState } from "react";

import FacilityClient from "../clients/FacilityClient";
import { AddButton } from "../components/buttons";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import { FacilityContext } from "../contexts/FacilityContext";
import GuestForm from "../forms/GuestForm";
import Pagination from "../components/Pagination";

const GuestView = () => {

    const facilityContext = useContext(FacilityContext);

    const [adding, setAdding] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [index, setIndex] = useState(-1);
    const [items, setItems] = useState([]);
    const [pageSize] = useState(10);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        retrieveAllItems();
    }, [facilityContext.selectedFacility]);

    const handleInsert = (guest) => {
        console.log("GuestView.handleInsert(" +
            JSON.stringify(guest, ["id", "firstName", "lastName"]) + ")");
        setAdding(null);
        retrieveItems(searchText, currentPage);
    }

    const handleRemove = (guest) => {
        console.log("GuestView.handleRemove(" +
            JSON.stringify(guest, ["id", "name", "lastName"]) + ")");
        retrieveItems(searchText, currentPage);
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
        retrieveItems(searchText, currentPage);
    }

    const onAdd = () => {
        console.log("GuestView.onAdd()");
        setAdding("true");
    }

    const onPageNext = () => {
        let newCurrentPage = currentPage + 1;
        setCurrentPage(newCurrentPage);
        retrieveItems(searchText, newCurrentPage );
    }

    const onPagePrevious = () => {
        let newCurrentPage = currentPage - 1;
        setCurrentPage(newCurrentPage);
        retrieveItems(searchText, newCurrentPage );
    }

    const onSearchChange = (event) => {
        console.log("GuestView.onSearchChange(" +
            event.target.value + ")");
        setCurrentPage(1);
        setSearchText(event.target.value);
        retrieveItems(event.target.value, currentPage);
    }

    const onSearchClick = () => {
        console.log("GuestView.onSearchClick(" +
            searchText + ")");
        retrieveItems(searchText, currentPage);
    }

    const retrieveAllItems = () => {
        setCurrentPage(1);
        setItems([]);
        setIndex(-1);
    }

    const retrieveItems = (newSearchText, newCurrentPage) => {
        if (newSearchText === "") {
            retrieveAllItems();
        } else {
            retrieveMatchingItems(newSearchText, newCurrentPage);
        }
    }

    const retrieveMatchingItems = (newSearchText, newCurrentPage) => {
        console.log("GuestView.retrieveItems for(" +
            JSON.stringify(facilityContext.selectedFacility,
                ["id", "name"]) + ", " + newSearchText + ", " +
                newCurrentPage + ")");
        FacilityClient.findGuestsByName
                (facilityContext.selectedFacility.id, newSearchText,
                    (pageSize * (newCurrentPage - 1)), pageSize)
            .then(response => {
                console.log("GuestView.retrieveItems got(" +
                    JSON.stringify(response.data,
                        ["id", "firstName", "lastName"]) +
                        ", " + newSearchText + ")");
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
                <div className="col-4">
                    <h4>Guests for {facilityContext.selectedFacility.name}</h4>
                </div>
                <div className="col-8">
                    <SearchBar
                        label="Filter"
                        onChange={onSearchChange}
                        onClick={onSearchClick}
                        placeholder="Enter all or part of either name ..."
                        value={searchText}
                        withClear
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-5">
                    <div className="row mb-1">
                        <div className="col float-left">
                            <AddButton onClick={onAdd}/>
                        </div>
                        <div className="col float-right">
                            <Pagination
                                currentPage={currentPage}
                                lastPage={(items.length === 0) ||
                                    (items.length < pageSize)}
                                onNext={onPageNext}
                                onPrevious={onPagePrevious}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <List
                            fields={["firstName", "lastName"]}
                            handleSelect={handleSelectedItem}
                            headers={["First Name", "Last Name"]}
                            index={index}
                            items={items}
                        />
                    </div>
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
