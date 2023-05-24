import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const createNewClient = async (clientData) => {
  try {
    return await axios.post(`${URL_BASE}/client/findOrCreate`, clientData);
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

export const updateClient = async (data, id) => {
  try {
    const dataToUpdate = {};
    for (const property in data) {
      if (data[property]) dataToUpdate[property] = data[property];
    }
    return await axios.put(`${URL_BASE}/client/${id}`, dataToUpdate);
  } catch (error) {
    console.log(error.message);
  }
};

export const getClientShops = async (clientId) => {
  try {
    return await axios.get(`${URL_BASE}/shops/shopsByClient/${clientId}`);
  } catch (error) {
    console.log(error.message);
  }
};
