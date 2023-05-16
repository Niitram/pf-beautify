import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getCategories = async () => {
    try {
        return await axios.get(`${URL_BASE}/categories`)
    } catch (error) {
        console.log(error.message);
    }
}