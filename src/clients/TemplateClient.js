import http from "../http-common";

let TEMPLATES_BASE = "/templates";

// Standard CRUD Endpoints

const all = () => {
    return http.get(TEMPLATES_BASE);
}

const find = templateId => {
    return http.get(TEMPLATES_BASE + `/${templateId}`);
}

const insert = template => {
    return http.post(TEMPLATES_BASE, template);
}

const remove = templateId => {
    return http.delete(TEMPLATES_BASE + `/${templateId}`);
}

const update = (templateId, template) => {
    return http.put(TEMPLATES_BASE + `/${templateId}`, template);
}

// Model Specific Endpoints

const generate = (templateId, registrationDate) => {
    return http.post(TEMPLATES_BASE +
        `/${templateId}/registrations/${registrationDate}`);
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
