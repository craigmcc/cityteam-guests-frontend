import http from "../http-common";

let FACILITIES_BASE = "/facilities";

// Standard CRUD Endpoints ---------------------------------------------------

const all = () => {
    return http.get(FACILITIES_BASE);
}

const find = (facilityId) => {
    return http.get(FACILITIES_BASE + `/${facilityId}`);
}

const insert = (facility) => {
    return http.post(FACILITIES_BASE, facility);
}

const remove = (facilityId) => {
    return http.delete(FACILITIES_BASE + `/${facilityId}`);
}

const update = (facilityId, facility) => {
    return http.put(FACILITIES_BASE + `/${facilityId}`, facility);
}

// Model Specific Endpoints --------------------------------------------------

// ***** Facility Lookups *****

const active = () => {
    return http.get(FACILITIES_BASE + "/active");
}

const exact = (name) => {
    return http.get(FACILITIES_BASE +`/exact/${name}`);
}

const name = (name) => {
    return http.get(FACILITIES_BASE + `/name/${name}`);
}

// ***** Facility-Guest Relationships *****

const guestAll = (facilityId) => {
    return http.get(FACILITIES_BASE + `/${facilityId}/guests`);
}

const guestExact = (facilityId, firstName, lastName) => {
    return http.get(FACILITIES_BASE +
        `/${facilityId}/guests/exact/${firstName}/${lastName}`);
}

const guestName = (facilityId, name, offset, limit) => {
    return http.get(FACILITIES_BASE +
        `/${facilityId}/guests/name/${name}?offset=${offset}&limit=${limit}`);
}

// ***** Facility-Registration Relationships *****

const registrationAll = (facilityId) => {
    return http.get(FACILITIES_BASE +
        `/${facilityId}/registrations`);
}

const registrationDate = (facilityId, registrationDate) => {
    return http.get(FACILITIES_BASE +
        `/${facilityId}/registrations/${registrationDate}`);
}

// ***** Facility-Template Relationships *****

const templateAll = (facilityId) => {
    return http.get(FACILITIES_BASE + `/${facilityId}/templates`);
}

const templateExact = (facilityId, name) => {
    return http.get(FACILITIES_BASE +
        `/${facilityId}/templates/exact/${name}`);
}

const templateName = (facilityId, name) => {
    return http.get(FACILITIES_BASE +
        `/${facilityId}/templates/name/${name}`);
}

/*
const removeRegistrationsByFacilityAndDate = (facilityId, registrationDate) => {
    return http.delete(FACILITIES_BASE +
        `/${facilityId}/registrations/${registrationDate}`);
}
*/

// Export All Endpoints

export default {

    // Standard
    all,
    find,
    insert,
    remove,
    update,

    // Specific
    active: active,
    exact: exact,
    name: name,
    guestAll: guestAll,
    guestExact: guestExact,
    guestName: guestName,
    registrationAll: registrationAll,
    registrationDate: registrationDate,
    templateAll: templateAll,
    templateExact: templateExact,
    templateName: templateName,
//    removeRegistrationsByFacilityAndDate

};
