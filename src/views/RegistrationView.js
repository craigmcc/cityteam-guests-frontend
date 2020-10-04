import React, { useContext, useEffect, useState } from "react";

import FacilityClient from "../clients/FacilityClient";
import TemplateClient from "../clients/TemplateClient";
import { withFlattenedObjects } from "../components/fields";
import List from "../components/List";
import RegistrationDateSelector from "../components/RegistrationDateSelector";
import TemplateSelector from "../components/TemplateSelector";
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

    const handleGenerate = (template) => {
        console.log("RegistrationView.handleGenerate for (" +
            JSON.stringify(template, ["id", "name"]) + ")");
        TemplateClient.generate(template.id, registrationDate)
            .then(response => {
                console.log("RegistrationView.handleGenerate got (" +
                    JSON.stringify(response.data, ["id", "matNumber", "features"]) + ")");
                saveItems(response.data);
            })
    }

    const handleRegistrationDate = (newRegistrationDate) => {
        console.log("RegistrationView.handleRegistrationDate(" +
            newRegistrationDate + ")");
        setRegistrationDate(newRegistrationDate);
        retrieveAllItems(newRegistrationDate);
    }

    const retrieveAllItems = (newRegistrationDate) => {
        FacilityClient.registrationDate(
            facilityContext.selectedFacility.id,
            newRegistrationDate
        )
            .then(response => {
                console.log("RegistrationView.retrieveAllItems(" +
                    JSON.stringify(response.data, ["id", "matNumber", "features", "guest"]) + ")");
                saveItems(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const saveItems = (items) => {
        let flattenedItems =
            withFlattenedObjects(items, "guest");
        for (let flattenedItem of flattenedItems) {
            flattenedItem.matNumberAndFeatures = "" + flattenedItem.matNumber;
            if (flattenedItem.features) {
                flattenedItem.matNumberAndFeatures += flattenedItem.features;
            }
        }
        setItems(flattenedItems);
        setIndex(-1);
    }

    return (

        <div className="container">

            <div className="row mt-2">
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

            { (items.length === 0) ? (
                <div className="row mb-2">
                    <div className="col-6">
                        <TemplateSelector
                            actionLabel="Generate"
                            handleAction={handleGenerate}
                         />
                    </div>
                </div>
            ) : (
                <span/>
            )}

            <div className="row">
                <div className="col-5">
                    <List
                        fields={["matNumberAndFeatures", "guest.firstName", "guest.lastName", "guest.comments"]}
                        headers={["Mat", "First Name", "Last Name", "Guest Comments"]}
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
