import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const cancelShop = async (shopId) => {
  try {
    return await axios.delete(`${URL_BASE}/shops/${shopId}`);
  } catch (error) {
    console.log(error.message);
  }
};
