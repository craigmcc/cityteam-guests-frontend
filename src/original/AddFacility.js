import React, { useState } from "react";
import FacilityClient from "../clients/FacilityClient";

const AddFacility = () => {

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

    const [facility, setFacility] = useState(initialFacilityState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFacility({ ...facility, [name]: value });
    }

    const saveFacility = () => {

        var data = {
            name: facility.name,
            address1: facility.address1,
            address2: facility.address2,
            city: facility.city,
            state: facility.state,
            zipCode: facility.zipCode,
            email: facility.email,
            phone: facility.phone
        };

        FacilityClient.insert(data)
            .then(response => {
                setFacility({
                    facilityId: response.data.facilityId,
                    name: response.data.name,
                    address1: response.data.address1,
                    address2: response.data.address2,
                    city: response.data.city,
                    state: response.data.state,
                    zipCode: response.data.zipCode,
                    email: response.data.email,
                    phone: response.data.phone
                });
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });

    }

    const newFacility = () => {
        setFacility(initialFacilityState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">

            {submitted ? (

                <div>
                    <h4>Facility submitted</h4>
                    <button className="btn btn-success" onClick={newFacility}/>
                </div>

            ) : (

                <div>

                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                className="form-control"
                                id="name"
                                name="name"
                                onChange={handleInputChange}
                                required
                                type="text"
                                value={facility.name}
                            />
                        </div>
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
                                value={facility.address1}
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
                                value={facility.address2}
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
                                value={facility.city}
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
                                value={facility.state}
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
                                value={facility.zipCode}
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
                                value={facility.email}
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
                                value={facility.phone}
                            />
                        </div>
                    </div>

                    <button onClick={saveFacility} className="btn btn-success">
                        Submit
                    </button>

                </div>

            )}
        </div>

    );

};

export default AddFacility;
