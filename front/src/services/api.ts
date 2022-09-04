import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.1.2:5000/v1/",
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
})