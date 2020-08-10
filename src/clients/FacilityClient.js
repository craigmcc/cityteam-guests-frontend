import http from "../http-common";

let FACILITIES_BASE = "/facilities";

// Standard CRUD Endpoints

const all = () => {
    return http.get(FACILITIES_BASE);
}

const find = facilityId => {
    return http.get(FACILITIES_BASE + "/${facilityId}");
}

const insert = facility => {
    return http.post(FACILITIES_BASE, facility);
}

const remove = facilityId => {
    return http.delete(FACILITIES_BASE + "/${facilityId}");
}

const update = (facilityId, facility) => {
    return http.put(FACILITIES_BASE + "/${facilityId}", facility);
}

// Model Specific Endpoints

const findByName = name => {
    return http.get(FACILITIES_BASE + "/name/${name}");
}

const findByNameExact = name => {
    return http.get(FACILITIES_BASE + "/nameExact/${name}");
}

const findGuestsByFacilityId = facilityId => {
    return http.get(FACILITIES_BASE + "/${facilityId}/guests");
}

const findGuestsByName = (facilityId, name) => {
    return http.get(FACILITIES_BASE + "/${facilityId}/guests/name/${name}");
}

const findGuestsByNameExact = (facilityId, firstName, lastName) => {
    return http.get(FACILITIES_BASE + "/${facilityId}/guests/nameExact/${firstName}/${lastName}");
}

const findRegistrationsByFacilityAndDate = (facilityId, registrationDate) => {
    return http.get(FACILITIES_BASE + "/${facilityId}/registrations/${registrationDate}");
}

const findTemplatesByFacilityId = facilityId => {
    return http.get(FACILITIES_BASE + "/${facilityId}/templates");
}

const findTemplatesByName = (facilityId, name) => {
    return http.get(FACILITIES_BASE + "/${facilityId}/templates/name/${name}");
}

const findTemplatesByNameExact = (facilityId, name) => {
    return http.get(FACILITIES_BASE + "/${facilityId}/templates/nameExact/${name}");
}

const removeRegistrationsByFacilityAndDate = (facilityId, registrationDate) => {
    return http.delete(FACILITIES_BASE + "/${facilityId}/registrations/${registrationDate}");
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
