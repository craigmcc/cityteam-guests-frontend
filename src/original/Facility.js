import React, { useState, useEffect } from "react";
import FacilityClient from "../clients/FacilityClient";

const Facility = props => {

    const initialFacilityState = {
        facilityId : null,
        name: "",
        address1 : "",
        address2 : "",
        city : "",
        state : "",
        zipCode : "",
        email : "",
        phone : ""
    };

    const [currentFacility, setCurrentFacility] = useState(initialFacilityState);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getFacility(props.match.params.facilityId);
    }, [props.match.params.facilityId]);

    const getFacility = facilityId => {
        FacilityClient.find(facilityId)
            .then(response => {
                setCurrentFacility(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentFacility({ ...currentFacility, [name] : value });
    };

    const removeFacility = () => {
        FacilityClient.remove(currentFacility.facilityId)
            .then(response => {
                props.history.push("/facilities");
            })
            .catch(e => {
                console.log(e);
            })
    }

    const updateFacility = () => {
        FacilityClient.update(currentFacility.facilityId, currentFacility)
            .then(response => {
                setMessage("Facility was updated successfully");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (

        <div>
            {currentFacility ? (
                <div className="edit-form">
                    <h4>Facility</h4>
                    <form>

                        <div className="form-group">
                            <label htmlFor="title">Name:</label>
                            <input
                                className="form-control"
                                id="name"
                                name="name"
                                onChange={handleInputChange}
                                required
                                type="text"
                                value={currentFacility.name}
                            />
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="address1">Address 1:</label>
                                <input
                                    className="form-control"
                                    id="address1"
                                    name="address1"
                                    onChange={handleInputChange}
                                    type="text"
                                    value={currentFacility.address1}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="address2">Address 2:</label>
                                <input
                                    className="form-control"
                                    id="address2"
                                    name="address2"
                                    onChange={handleInputChange}
                                    type="text"
                                    value={currentFacility.address2}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="city">City:</label>
                                <input
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    onChange={handleInputChange}
                                    type="text"
                                    value={currentFacility.city}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="state">State:</label>
                                <input
                                    className="form-control"
                                    id="state"
                                    name="state"
                                    onChange={handleInputChange}
                                    type="text"
                                    value={currentFacility.state}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="zipCode">Zip Code:</label>
                                <input
                                    className="form-control"
                                    id="zipCode"
                                    name="zipCode"
                                    onChange={handleInputChange}
                                    type="text"
                                    value={currentFacility.zipCode}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address:</label>
                                <input
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    onChange={handleInputChange}
                                    type="text"
                                    value={currentFacility.email}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number:</label>
                                <input
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    onChange={handleInputChange}
                                    type="text"
                                    value={currentFacility.phone}
                                />
                            </div>
                        </div>

                        <button
                            className="badge badge-success"
                            onClick={updateFacility}
                            type="submit"
                        >
                            Update
                        </button>

                        <p>{message}</p>

                    </form>

                    <button className="badge badge-danger mr-2" onClick={removeFacility}>
                        Remove
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateFacility}
                    >
                        Update
                    </button>

                    <p>{message}</p>

                </div>

            ) : (

                <div>
                    <br />
                    <p>Please click on a Facility</p>
                </div>

            )}
        </div>

    );

};

export default Facility;
