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
    return await axios.get(
      `${URL_BASE}/appointments/service/${serviceId}/date/${date}`
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const createAppointmentMP = async (appointmentData) => {
  try {
    return await axios.post(
      `${URL_BASE}/mercadopago/service_preference`,
      appointmentData
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    return await axios.post(`${URL_BASE}/appointments`, appointmentData);
  } catch (error) {
    console.log(error.message);
  }
};
export const getAllAppointments = async () => {
  try {
    return await axios.get(`${URL_BASE}/appointments`);
  } catch (error) {
    console.log(error.message);
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    return await axios.delete(`${URL_BASE}/appointments/${appointmentId}`);
  } catch (error) {
    console.log(error.message);
  }
};
