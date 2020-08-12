import React, { useEffect, useState } from "react";
import FacilityClient from "../clients/FacilityClient";
import { SearchBar } from "../components/searchbar";
import {Link} from "react-router-dom";

const FacilitiesView = (props) => {

    const [currentFacility, setCurrentFacility] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [facilities, setFacilities] = useState([]);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveAllFacilities();
    }, []);

    const recordSearchChange = searchName => {
        console.log("FacilitiesView.recordSearchChange(" + searchName + ")");
        setSearchName(searchName);
        retrieveFacilities();
    }

    const recordSearchClear = searchName => {
        console.log("FacilitiesView.recordSearchClear(" + searchName + ")");
        setSearchName(searchName);
        retrieveFacilities();
    }

    const recordSearchClick = searchName => {
        console.log("FacilitiesView.recordSearchClick(" + searchName + ")");
        setSearchName(searchName);
        retrieveFacilities();
    }

    const retrieveAllFacilities = () => {
        FacilityClient.all()
            .then(response => {
                setFacilities(response.data);
                console.log("retrieveAllFacilities: Found " + facilities);
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
        FacilityClient.findByName(searchName)
            .then(response => {
                setFacilities(response.data);
                console.log("retrieveMatchingFacilities: Found " + facilities);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const setActiveFacility = (facility, index) => {
        setCurrentFacility(facility);
        setCurrentIndex(index);
    };

    return (

        <div className={"container"}>

            <div className="list row">
                <div className="container">
                    <h3>Facilities</h3>
                </div>
                <div className="container">
                    <SearchBar
                        onChange={recordSearchChange}
                        onClick={recordSearchClick}
                        placeholder="Search by name ..."
                        withClear
                    />
                </div>
            </div>

        </div>

    );

};

export default FacilitiesView;
