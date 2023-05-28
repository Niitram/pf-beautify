import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getAppointmentsByClient = async (clientId) => {
  try {
    return await axios.get(`${URL_BASE}/appointments/client/${clientId}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAppointmentsHours = async (serviceId, date) => {
  try {
    return await axios.get(`${URL_BASE}/appointments/service/${serviceId}/date/${date}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const createAppointment = async () => {
  /* try {
    return await axios.get(`${URL_BASE}/appointments/service/${serviceId}/date/${date}`);
  } catch (error) {
    console.log(error.message);
  } */
};
