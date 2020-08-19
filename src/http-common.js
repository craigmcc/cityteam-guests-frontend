import axios from "axios";

export default axios.create({
    baseURL: baseURL(),
    headers: {
        "Content-Type" : "application/json"
    }
});

function baseURL() {
    let nodeEnv = process.env.NODE_ENV;
    console.log("Configuring remote server for " +
        (nodeEnv ? nodeEnv : "default") + " mode.");
    switch (nodeEnv) {
        case "development":
        case "test":
            return "http://localhost:8080/guests-backend/api";
        case "production":
        default:
            return "http://wildfly.hopto.org:8080/guests-backend/api";
    }
}
