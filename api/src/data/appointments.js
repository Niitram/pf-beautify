const {
  createAppointment,
} = require("../controllers/Appointments/postAppointmentByClient");
const appointments = require("./appointments.json");

const bulkCreateAppointments = async () => {
  try {
    const promesas = await appointments.map(
      async ({ profesionalId, clientId, serviceId, date, hour }) => {
        return await createAppointment(
          profesionalId,
          clientId,
          serviceId,
          date,
          hour
        );
      }
    );

    Promise.all(promesas);
    console.log("Los appointments se han cargado en la base de datos");
  } catch (error) {
    console.log("los appointments no se han cargado exitosamente");
  }
};

module.exports = bulkCreateAppointments;
