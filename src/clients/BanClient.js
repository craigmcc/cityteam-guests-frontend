import http from "../http-common";

let BANS_BASE = "/bans";

// Standard CRUD Endpoints

const all = () => {
    return http.get(BANS_BASE);
}

const find = banId => {
    return http.get(BANS_BASE + `/${banId}`);
}

const insert = ban => {
    return http.post(BANS_BASE, ban);
}

const remove = banId => {
    return http.delete(BANS_BASE + `/${banId}`);
}

const update = (banId, ban) => {
    return http.put(BANS_BASE + `/${banId}`, ban);
}

// Model Specific Endpoints

export default {

    // Standard
    all,
    find,
    insert,
    remove,
    update,

    // Specific

}
