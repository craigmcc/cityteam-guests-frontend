import React, { useContext } from "react";

import { FacilityContext } from "../contexts/FacilityContext";

// props.handleSelect Handle (facility) that was just selected [No handler]
export const FacilitySelector = (props) => {

    const facilityContext = useContext(FacilityContext);

    const onChange = (event) => {
        let newId = Number(event.target.value);
        for (let facility of facilityContext.facilities) {
            if (facility.id === newId) {
                console.log("FacilitySelector.onChange(" +
                    JSON.stringify(facility) + ")");
                facilityContext.setSelectedFacility(facility);
                if (props.handleSelect) {
                    props.handleSelect(facility);
                }
                break;
            }
        }
    }

    return (

            <div className="form-row">

                <div className="row form-group">

                    <label
                        className="mr-3"
                        htmlFor="currentFacility"
                    >
                        Current Facility:
                    </label>

                    <select
                        id="currentFacility"
                        name="currentFacility"
                        onChange={onChange}
                        value={facilityContext.selectedFacility.id}
                    >
                        {facilityContext.facilities.map(facility => (
                            <option
                                key={facility.id}
                                value={facility.id}
                            >
                                {facility.name}
                            </option>
                        ))}
                    </select>

                </div>

            </div>

    );

}

export default FacilitySelector;
