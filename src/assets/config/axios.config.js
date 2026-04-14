import axios from "axios";

export default axios.create({
    baseURL: "/api",          // proxy orqali
    headers: {
        "Accept": "application/json",
    },
});