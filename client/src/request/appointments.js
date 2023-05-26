import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getAppointmentsByClient = async (clientId) => {
  try {
    return await axios.get(`${URL_BASE}/appointments/client/${clientId}`);
  } catch (error) {
    console.log(error.message);
  }
};
