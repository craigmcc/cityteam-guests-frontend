import React, { createContext, useEffect, useState } from "react";

import FacilityClient from "../clients/FacilityClient";

// Provider for FacilityContext that contains context variables related to
// available (active) facilities and the currently selected one (if any):
//   facilities - Array of available active facilities [ [] ]
//   selectedFacility - Currently selected facility, or none indicator
//     [ { id: 0 } ]

export const FacilityContext = createContext();

// Helper functions to establish initial state
export const FacilityContextProvider = (props) => {

    const [facilities, setFacilities] =
        useState([
            { id: -3, name: "Third" },
            { id: -4, name: "Fourth" }
        ]);
    const [selectedFacility, setSelectedFacility] =
        useState({ id: -4, name: "Fourth" });

    // useEffect call to retrieve initial values
    useEffect(() => {

        async function fetchData() {

            let results = await FacilityClient.findByActive();
//            console.log("FacilityContext.findByActive() results: " +
//                JSON.stringify(results.data, null, 2));
            setFacilities(results.data);

            let result = await FacilityClient.findByNameExact("Portland");
//            console.log("FacilityContext.findByNameExact(Portland) results: " +
//                JSON.stringify(result.data, null, 2));
            setSelectedFacility(result.data);

/*
            try {
                let badResults = await FacilityClient.findByNameExact("Bad");
                console.log("FacilityContext.findByNameExact(Bad) results: " +
                    JSON.stringify(badResults, null, 2));
            } catch (error) {
                console.log("FacilityContext.findByNameExact(Bad) error: " +
                    JSON.stringify(error, null, 2));
                if (error instanceof BadRequest) {
                    console.log("FacilityContext.findByNameExact(Bad) was a BadRequest");
                } else {
                    console.log("FacilityContext.findByNameExact(Bad) was NOT a BadRequest");
                }
            }
*/

        }

//        console.log("FacilityContext: useEffect(begin)");
        fetchData();

    }, []);

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

export default FacilityContext;
