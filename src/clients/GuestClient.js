import http from "../http-common";

let GUESTS_BASE = "/guests";

// Standard CRUD Endpoints

const all = () => {
    return http.get(GUESTS_BASE);
}

const find = guestId => {
    return http.get(GUESTS_BASE + `/${guestId}`);
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

// Model Specific Endpoints

const findBans = (guestId) => {
    return http.get(GUESTS_BASE +
        `/${guestId}/bans`);
}

const findBansByRegistrationDate = (guestId, registrationDate) => {
    return http.get(GUESTS_BASE +
        `/${guestId}/bans/${registrationDate}`);
}

const findRegistrations = (guestId) => {
    return http.get(GUESTS_BASE +
        `/${guestId}/registrations`);
}

const findRegistrationsByRegistrationDate = (guestId, registrationDate) => {
    return http.get(GUESTS_BASE +
        `/${guestId}/registrations/${registrationDate}`);
}

export default {

    // Standard
    all,
    find,
    insert,
    remove,
    update,

    // Specific
    findBans,
    findBansByRegistrationDate,
    findRegistrations,
    findRegistrationsByRegistrationDate

}
