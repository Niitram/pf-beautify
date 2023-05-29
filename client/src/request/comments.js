import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getCommentsByClient = async (clientId) => {
  try {
    return await axios.get(`${URL_BASE}/comments/client/${clientId}`);
  } catch (error) {
    console.log(error.message);
  }
};
