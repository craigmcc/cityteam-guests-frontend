import http from "../http-common";
import queryParameters from "../util/query.parameters";

let GUESTS_BASE = "/guests";

// Standard CRUD Endpoints ---------------------------------------------------

const all = (options) => {
    return http.get(GUESTS_BASE + `${queryParameters(options)}`);
}

const find = (guestId, options) => {
    return http.get(GUESTS_BASE + `/${guestId}${queryParameters(options)}`);
}

const insert = guest => {
    return http.post(GUESTS_BASE, guest);
}

const remove = guestId => {
    return http.delete(GUESTS_BASE + `/${guestId}`);
}

const update = (guestId, guest) => {
    return http.put(GUESTS_BASE + `/${guestId}`, guest);
}

// Model Specific Endpoints --------------------------------------------------

/*
const banAll = (guestId) => {
    return http.get(GUESTS_BASE +
        `/${guestId}/bans`);
}

const banRegistrationDate = (guestId, registrationDate) => {
    return http.get(GUESTS_BASE +
        `/${guestId}/bans/${registrationDate}`);
}
*/

const registrationAll = (guestId, options) => {
    return http.get(GUESTS_BASE +
        `/${guestId}/registrations${queryParameters(options)}`);
}

export default {

    // Standard
    all,
    find,
    insert,
    remove,
    update,

    // Specific
/*
    findBans,
    findBansByRegistrationDate,
*/
    registrationAll,

}
