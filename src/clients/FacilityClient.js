import http from "../http-common";
import queryParameters from "../util/query.parameters";

let FACILITIES_BASE = "/facilities";

// Standard CRUD Endpoints ---------------------------------------------------

const all = (options) => {
    return http.get(FACILITIES_BASE + queryParameters(options));
}

const find = (facilityId, options) => {
    return http.get(FACILITIES_BASE + `/${facilityId}${queryParameters(options)}`);
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

const active = (options) => {
    return http.get(FACILITIES_BASE + `/active${queryParameters(options)}`);
}

const exact = (name, options) => {
    return http.get(FACILITIES_BASE +`/exact/${name}${queryParameters(options)}`);
}

const name = (name, options) => {
    return http.get(FACILITIES_BASE + `/name/${name}${queryParameters(options)}`);
}

// ***** Facility-Guest Relationships *****

const guestAll = (facilityId, options) => {
    return http.get(FACILITIES_BASE + `/${facilityId}/guests${queryParameters(options)}`);
}

const guestExact = (facilityId, firstName, lastName, options) => {
    return http.get(FACILITIES_BASE +
        `/${facilityId}/guests/exact/${firstName}/${lastName}${queryParameters(options)}`);
}

const guestName = (facilityId, name, options) => {
    return http.get(FACILITIES_BASE +
        `/${facilityId}/guests/name/${name}${queryParameters(options)}`);
}

// ***** Facility-Registration Relationships *****

const registrationAll = (facilityId, options) => {
    return http.get(FACILITIES_BASE +
        `/${facilityId}/registrations${queryParameters(options)}`);
}

const registrationDate = (facilityId, registrationDate, options) => {
    return http.get(FACILITIES_BASE +
        `/${facilityId}/registrations/${registrationDate}${queryParameters(options)}`);
}

// ***** Facility-Template Relationships *****

const templateAll = (facilityId, options) => {
    return http.get(FACILITIES_BASE + `/${facilityId}/templates${queryParameters(options)}`);
}

const templateExact = (facilityId, name, options) => {
    return http.get(FACILITIES_BASE +
        `/${facilityId}/templates/exact/${name}${queryParameters(options)}`);
}

const templateName = (facilityId, name, options) => {
    return http.get(FACILITIES_BASE +
        `/${facilityId}/templates/name/${name}${queryParameters(options)}`);
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
