import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getProfessionalById = async (id) => {
  try {
    return await axios.get(`${URL_BASE}/profesionals/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllProfessionals = async () => {
  try {
    return await axios.get(`${URL_BASE}/profesionals`);
  } catch (error) {
    console.logs(error.message);
  }
};
