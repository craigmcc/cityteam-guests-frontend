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
            { id: -3, name: "Third" },
            { id: -4, name: "Fourth" }
        ]);
    const [firstTime, setFirstTime] = useState(true);
    const [selectedFacility, setSelectedFacility] =
        useState({ id: -4, name: "Fourth" });

    const fetchInitialFacilities = () => {
        FacilityClient.findByActive()
            .then(response => {
                console.log("FacilityContext.fetchInitialFacilities(" +
                    JSON.stringify(response.data, ["id", "name"]) + ")");
                setFacilities(response.data);
            })
    }

    const fetchInitialSelectedFacility = (name) => {
        FacilityClient.findByNameExact(name)
            .then(response => {
                console.log("FacilityContext.fetchInitialSelectedFacility(" +
                    JSON.stringify(response.data, ["id", "name"]) + ")");
                setSelectedFacility(response.data);
            })
    }

    // useEffect call to retrieve initial values
    useLayoutEffect(() => {

        function fetchData() {
            if (firstTime) {
                setFirstTime(false);
                fetchInitialFacilities();
                fetchInitialSelectedFacility("Portland");
            }
        }

        fetchData();
    }, [firstTime]);

    // Can define methods to be included in context as well
    const deassignSelectedFacility = () => {
        setSelectedFacility({ id: 0, name: "DESELECTED" });
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
