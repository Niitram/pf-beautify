import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const cancelShop = async (shopId) => {
  try {
    return await axios.delete(`${URL_BASE}/shops/${shopId}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllSales = async () => {
  try {
    return await axios.get(`${URL_BASE}/shops/allDetails`);
  } catch (error) {
    console.log(error.message);
  }
};
