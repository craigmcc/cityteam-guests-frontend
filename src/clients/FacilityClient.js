import http from "../http-common";

// Standard CRUD Endpoints

const all = () => {
    return http.get("/facilities");
}

const find = facilityId => {
    return http.get("/facilities/${facilityId}");
}

const insert = facility => {
    return http.post("/facilities", facility);
}

const remove = facilityId => {
    return http.delete("/facilities/${facilityId}");
}

const update = (facilityId, facility) => {
    return http.put("/facilities/${facilityId}", facility);
}

// Model Specific Endpoints

const findByName = name => {
    console.log("FacilityClient.findByName(" + name + ")");
    return http.get("/facilities/name/${name}");
}

const findByNameExact = name => {
    return http.get("/facilities/nameExact/${name}");
}

const findGuestsByFacilityId = facilityId => {
    return http.get("/facilities/${facilityId}/guests");
}

const findGuestsByName = (facilityId, name) => {
    return http.get("/facilities/${facilityId}/guests/name/${name}");
}

const findGuestsByNameExact = (facilityId, firstName, lastName) => {
    return http.get("/facilities/${facilityId}/guests/nameExact/${firstName}/${lastName}");
}

const findRegistrationsByFacilityAndDate = (facilityId, registrationDate) => {
    return http.get("/facilities/${facilityId}/registrations/${registrationDate}");
}

const findTemplatesByFacilityId = facilityId => {
    return http.get("/facilities/${facilityId}/templates");
}

const findTemplatesByName = (facilityId, name) => {
    return http.get("/facilities/${facilityId}/templates/name/${name}");
}

const findTemplatesByNameExact = (facilityId, name) => {
    return http.get("/facilities/${facilityId}/templates/nameExact/${name}");
}

const removeRegistrationsByFacilityAndDate = (facilityId, registrationDate) => {
    return http.delete("/facilities/${facilityId}/registrations/${registrationDate}");
}

// Export All Endpoints

export default {

    // Standard
    all,
    find,
    insert,
    remove,
    update,

    // Specific
    findByName,
    findByNameExact,
    findGuestsByFacilityId,
    findGuestsByName,
    findGuestsByNameExact,
    findRegistrationsByFacilityAndDate,
    findTemplatesByFacilityId,
    findTemplatesByName,
    findTemplatesByNameExact,
    removeRegistrationsByFacilityAndDate

};
