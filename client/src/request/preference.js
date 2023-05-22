import axios from "axios";

const URL_BASE = "http://localhost:3001";

export default async function askPreference(props) {
  try {
    return await axios.post(`${URL_BASE}/mercadopago/create_preference`, props);
  } catch (error) {
    console.log(error.message);
  }
}
