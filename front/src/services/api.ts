import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000/v1/",
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
})