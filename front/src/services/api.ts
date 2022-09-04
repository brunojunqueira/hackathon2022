import axios from "axios";

export const api = axios.create({
    baseURL: "http://petroconnect.tofireplace.com:5000/v1/",
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
})