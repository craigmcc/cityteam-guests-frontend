import http from "../http-common";
import queryParameters from "../util/query.parameters";

let REGISTRATIONS_BASE = "/registrations";

// Standard CRUD Endpoints ---------------------------------------------------

const all = (options) => {
    return http.get(REGISTRATIONS_BASE + `${queryParameters(options)}`);
}

const find = (registrationId, options) => {
    return http.get(REGISTRATIONS_BASE + `/${registrationId}${queryParameters(options)}`);
}

const insert = registration => {
    return http.post(REGISTRATIONS_BASE, registration);
}

const remove = registrationId => {
    return http.delete(REGISTRATIONS_BASE + `/${registrationId}`);
}

const update = (registrationId, registration) => {
    return http.put(REGISTRATIONS_BASE + `/${registrationId}`, registration);
}

// Model Specific Endpoints --------------------------------------------------

const assign = (registrationId, assign) => {
    return http.post(REGISTRATIONS_BASE + `/${registrationId}/assign`, assign);
}

const deassign = (registrationId) => {
    return http.post(REGISTRATIONS_BASE + `/${registrationId}/deassign`);
}

const reassign = (registrationIdFrom, registrationIdTo) => {
    return http.post(REGISTRATIONS_BASE +
        `/${registrationIdFrom}/reassign/${registrationIdTo}`);
}

export default {

    // Standard
    all,
    find,
    insert,
    remove,
    update,

    // Specific
    assign,
    deassign,
    reassign,

}
