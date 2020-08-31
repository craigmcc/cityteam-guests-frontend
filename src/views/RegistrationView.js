import React, { useContext, useEffect, useState } from "react";

import FacilityClient from "../clients/FacilityClient";
import List from "../components/List";
import RegistrationDateSelector from "../components/RegistrationDateSelector";
import { FacilityContext } from "../contexts/FacilityContext";

const RegistrationView = () => {

    const facilityContext = useContext(FacilityContext);

    const [index, setIndex] = useState(-1);
    const [items, setItems] = useState([]);
    const [registrationDate, setRegistrationDate] =
        useState("2020-07-04"); // TODO - "today"

    useEffect(() => {
        retrieveAllItems(registrationDate);
        // eslint-disable-next-line
    }, [facilityContext.selectedFacility])

    const handleRegistrationDate = (newRegistrationDate) => {
        console.log("RegistrationView.handleRegistrationDate(" +
            newRegistrationDate + ")");
        setRegistrationDate(newRegistrationDate);
        retrieveAllItems(newRegistrationDate);
    }

    const retrieveAllItems = (newRegistrationDate) => {
        FacilityClient.findRegistrationsByFacilityAndDate(
            facilityContext.selectedFacility.id,
            newRegistrationDate
        )
            .then(response => {
                console.log("RegistrationView.retrieveAllItems(" +
                    JSON.stringify(response.data, ["id", "matNumber"]) + ")");
                setIndex(-1);
                setItems(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (

        <div className="container">

            <div className="row mt-2 mb-2">
                <div className="col-6">
                    <h4>Registrations for {facilityContext.selectedFacility.name}</h4>
                </div>
                <div className="col-6">
                    <RegistrationDateSelector
                        handleRegistrationDate={handleRegistrationDate}
                        registrationDate={registrationDate}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-5">
                    <List
                        fields={["matNumber", "features", "guestId"]}
                        headers={["Mat", "Features", "Guest Id"]}
                        index={index}
                        items={items}
                    />
                </div>
                <div className="col-7">
                    Reserved for details or something
                </div>
            </div>

        </div>

    );

};

export default RegistrationView;
