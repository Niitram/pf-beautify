import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getServices = async () => {
    try {
        return await axios.get(`${URL_BASE}/services`)
    } catch (error) {
        console.log(error.message);
    }
}

export const getServiceById = async (id) => {
    try {
        return await axios.get(`${URL_BASE}/services/${id}`)
    } catch (error) {
        console.log(error.message);
    }
}

