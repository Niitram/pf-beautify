import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const createNewClient = async (clientData) => {

  try {
    return await axios.post(`${URL_BASE}/client`, clientData);
  } catch (error) {
    console.log(error.message);
  }
};
export const getClient = async (mail) => {
  try {
    return await axios.get(`${URL_BASE}/client/${mail}`);
  } catch (error) {
    console.log(error.message);
  }
};
export const postFindOrCreate = async (userData) => {
  try {
    return await axios.post(`${URL_BASE}/client/findOrCreate`, userData);
  } catch (error) {
    console.log(error.message);
  }
};

