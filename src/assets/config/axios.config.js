import axios from "axios";

const backendBaseUrl = import.meta.env.DEV
  ? "/api"
  : "https://e-commerce-api-v4.nt.azimumarov.uz";

export default axios.create({
    baseURL: backendBaseUrl,
    headers: {
        "Accept": "application/json",
    },
});