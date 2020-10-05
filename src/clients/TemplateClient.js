import http from "../http-common";
import queryParameters from "../util/query.parameters";

let TEMPLATES_BASE = "/templates";

// Standard CRUD Endpoints ---------------------------------------------------

const all = (options) => {
    return http.get(TEMPLATES_BASE + `${queryParameters(options)}`);
}

const find = (templateId, options) => {
    return http.get(TEMPLATES_BASE + `/${templateId}${queryParameters(options)}`);
}

const insert = (template) => {
    return http.post(TEMPLATES_BASE, template);
}

const remove = (templateId) => {
    return http.delete(TEMPLATES_BASE + `/${templateId}`);
}

const update = (templateId, template) => {
    return http.put(TEMPLATES_BASE + `/${templateId}`, template);
}

// Model Specific Endpoints

const generate = (templateId, registrationDate) => {
    return http.post(TEMPLATES_BASE +
        `/${templateId}/generate/${registrationDate}`);
}

export default {

    // Standard
    all,
    find,
    insert,
    remove,
    update,

    // Specific
    generate,

}
