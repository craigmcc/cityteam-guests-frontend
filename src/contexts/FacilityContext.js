import React, { createContext, useLayoutEffect, useState } from "react";

import FacilityClient from "../clients/FacilityClient";

// Provider for FacilityContext that contains context variables related to
// available (active) facilities and the currently selected one (if any):
//   facilities - Array of available active facilities [ [] ]
//   selectedFacility - Currently selected facility, or none indicator
//     [ { id: -1, name: "UNSELECTED" } ]

export const FacilityContext = createContext({
    facilities : [],
    selectedFacility: { id: -1, name: "UNSELECTED" }
});

// Helper functions to establish initial state
export const FacilityContextProvider = (props) => {

    const [facilities, setFacilities] =
        useState([
            { id: -1, name: "Unknown" }
        ]);
    const [selectedFacility, setSelectedFacility] =
        useState({ id: -1, name: "Unknown" });

    // useEffect call to retrieve initial values and set selected
    useLayoutEffect(() => {

        function fetchData(name) {
            FacilityClient.findByActive()
                .then(response => {
                    console.log("FacilityContext.fetchData.available(" +
                        JSON.stringify(response.data, ["id", "name"]) + ")");
                    setFacilities(response.data);
                    for (let facility of response.data) {
                        if (name === facility.name) {
                            console.log("FacilityContext.fetchData.selected(" +
                                JSON.stringify(facility, ["id", "name"]) + ")");
                            setSelectedFacility(facility);
                        }
                    }
                })
        }

        fetchData("Portland");

    }, []);

    // Can define methods to be included in context as well
    const deassignSelectedFacility = () => {
        setSelectedFacility({ id: -1, name: "DESELECTED" });
    }

    // Create the context object
    const facilityContext = {
        // Data values and corresponding setters
        facilities, setFacilities,
        selectedFacility, setSelectedFacility,
        // Exported functions
        deassignSelectedFacility
    };

    // Return it, rendering children inside
    return (
        <FacilityContext.Provider value={facilityContext}>
            {props.children}
        </FacilityContext.Provider>
    );

}
