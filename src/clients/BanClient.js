import http from "../http-common";
import queryParameters from "../util/query.parameters";

let BANS_BASE = "/bans";

// Standard CRUD Endpoints

const all = (options) => {
    return http.get(BANS_BASE + `${queryParameters(options)}`);
}

const find = (banId, options) => {
    return http.get(BANS_BASE + `/${banId}${queryParameters(options)}`);
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
