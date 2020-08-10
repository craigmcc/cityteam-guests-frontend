import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/guests/api",
    headers: {
        "Content-Type" : "application/json"
    }
});
