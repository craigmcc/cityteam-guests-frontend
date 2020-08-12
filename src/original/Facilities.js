import React, { useEffect, useState } from "react";
import FacilityClient from "../clients/FacilityClient";
import { Link } from "react-router-dom";

const Facilities = () => {

        const [facilities, setFacilities] = useState([]);
        const [currentFacility, setCurrentFacility] = useState(null);
        const [currentIndex, setCurrentIndex] = useState(-1);
        const [searchName, setSearchName] = useState("");

        useEffect(() => {
            retrieveFacilities();
        }, []);

        const findByName = () => {
            FacilityClient.findByName(searchName)
                .then(response => {
                    setFacilities(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
        };

        const onChangeSearchName = e => {
            const searchName = e.target.value;
            setSearchName(searchName);
        };

/*
        const refreshList = () => {
            retrieveFacilities();
            setCurrentFacility(null);
            setCurrentIndex(-1);
        };
*/

        const retrieveFacilities = () => {
            FacilityClient.all()
                .then(response => {
                    setFacilities(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        };

        const setActiveFacility = (facility, index) => {
            setCurrentFacility(facility);
            setCurrentIndex(index);
        };

        return (

            <div className="list row">

                <div className="col-md-8">
                    <div className="input-group md-3">
                        <input
                            className="form-control"
                            onChange={onChangeSearchName}
                            placeholder="Search by name"
                            type="text"
                            value={searchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={findByName}
                                type="button"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">

                    <br />
                    <h4>Facilities List</h4>
                    <br />

                    <ul className="list-group">
                        {facilities && facilities.map((facility, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                key={index}
                                onClick={() => setActiveFacility(facility,index)}
                            >
                                {facility.name}
                            </li>
                        ))}
                    </ul>

                </div>

                <div className="col-md-6">

                    {currentFacility ? (

                        <div>

                            <br />
                            <h4>Facility</h4>
                            <br />

                            <div>
                                <label><strong>Name:</strong></label>{" "}
                                {currentFacility.name}
                            </div>
                            <div>
                                <label><strong>Address 1:</strong></label>{" "}
                                {currentFacility.address1}
                            </div>
                            <div>
                                <label><strong>Address 2:</strong></label>{" "}
                                {currentFacility.address2}
                            </div>
                            <div>
                                <label><strong>City:</strong></label>{" "}
                                {currentFacility.city}
                            </div>
                            <div>
                                <label><strong>State:</strong></label>{" "}
                                {currentFacility.state}
                            </div>
                            <div>
                                <label><strong>Zip Code:</strong></label>{" "}
                                {currentFacility.zipCode}
                            </div>
                            <div>
                                <label><strong>Email Address:</strong></label>{" "}
                                {currentFacility.email}
                            </div>
                            <div>
                                <label><strong>Phone Number:</strong></label>{" "}
                                {currentFacility.phone}
                            </div>

                            <Link
                                className="badge badge-warning"
                                to={"/facilities/" + currentFacility.id}
                            >
                                Edit
                            </Link>
                        </div>

                    ) : (

                        <div>
                            <br/>
                            <p>Please click on a Facility</p>
                        </div>

                    )}
                </div>

            </div>

        );

};

export default Facilities;
