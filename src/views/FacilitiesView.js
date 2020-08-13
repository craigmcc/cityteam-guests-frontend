import React, { useEffect, useState } from "react";
import { AddButton } from "../components/buttons";
import FacilityClient from "../clients/FacilityClient";
import FacilitiesList from "../components/FacilitiesList"
import SearchBar from "../components/SearchBar";
// import { Link } from "react-router-dom";

const FacilitiesView = () => {

    const [currentFacility, setCurrentFacility] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [facilities, setFacilities] = useState([]);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveAllFacilities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAdd = () => {
        console.log("FacilitiesView.onAdd()");
        // TODO - set up for an add form, move focus
    }

    const recordSearchChange = searchName => {
        console.log("FacilitiesView.recordSearchChange(" + searchName + ")");
        setSearchName(searchName);
        retrieveFacilities();
    }

    const recordSearchClick = searchName => {
        console.log("FacilitiesView.recordSearchClick(" + searchName + ")");
        setSearchName(searchName);
        retrieveFacilities();
    }

    const retrieveAllFacilities = () => {
        console.log("FacilitiesView.retrieveAllFacilities()");
        FacilityClient.all()
            .then(response => {
                console.log("FacilitiesView.retrieveAllFacilities: Found " +
                    JSON.stringify(response.data, ["id", "name"]));
                setFacilities(response.data);
                console.log("FacilitiesView.retrieveAllFacilities: Saved " +
                    JSON.stringify(facilities, ["id", "name"]));
            })
            .catch(e => {
                console.log(e);
            });
    }

    const retrieveFacilities = () => {
        if (searchName === "") {
            retrieveAllFacilities();
        } else {
            retrieveMatchingFacilities();
        }
    }

    const retrieveMatchingFacilities = () => {
        console.log("FacilitiesView.retrieveMatchingFacilities(" + searchName + ")");
        FacilityClient.findByName(searchName)
            .then(response => {
                console.log("FacilitiesView.retrieveMatchingFacilities: Found " +
                    JSON.stringify(response.data, ["id", "name"]));
                setFacilities(response.data);
                console.log("FacilitiesView.retrieveMatchingFacilities: Saved " +
                    JSON.stringify(response.data, ["id", "name"]));
            })
            .catch(e => {
                console.log(e);
            });
    }

    const setActiveFacility = (facility, index) => {
        if (currentIndex === index) {
            console.log("FacilitiesView.setActiveFacility(<none>, " +
                index + ")");
            setCurrentFacility(null);
            setCurrentIndex(-1);
        } else {
            console.log("FacilitiesView.setActiveFacility(" +
                (facility ? facility.name : "<???>") +
                ", " + index + ")");
            setCurrentFacility(facility);
            setCurrentIndex(index);
        }
    };

    return (

        <div className={"container"}>

            <div className="row">
                <div className="col-sm-2">
                    <h4>Facilities</h4>
                </div>
                <div className="col-lg">
                    <SearchBar
                        onChange={recordSearchChange}
                        onClick={recordSearchClick}
                        placeholder="Search by name ..."
                        withClear
 //                       withSearch
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

                    <FacilitiesList
                        items={facilities}
                        onClick={setActiveFacility}
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
