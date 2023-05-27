import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getCart = async (clientId) => {
    try {
        return await axios.get(`${URL_BASE}/savedCarts/${clientId}`)
    } catch (error) {
        console.log(error.message);
    }
}

export const postCart = async (clientId, products) => {
    try {
        return await axios.post(`${URL_BASE}/savedCarts/${clientId}`, products)
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteCart = async (clientId) => {
    try {
        return await axios.delete(`${URL_BASE}/savedCarts/${clientId}`)
    } catch (error) {
        console.log(error.message);
    }
};