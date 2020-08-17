import axios from "axios";

export default axios.create({
    baseURL: process.env.BASE_URL ? process.env.BASE_URL :
//        "http://localhost:8080/guests-backend/api",
        "http://wildfly.hopto.org:8080/guests-backend/api",
    headers: {
        "Content-Type" : "application/json"
    }
});
