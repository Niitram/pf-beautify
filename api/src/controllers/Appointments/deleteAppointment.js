const { Appointment } = require("../../db.js");

const deleteAppointment = async (appointmentId) => {
  const appointment = await Appointment.findByPk(appointmentId);
  if (appointment.paid) console.log("le tengo que devolver la plata guacho");
  await appointment.destroy();
  return { message: "Cita eliminada correctamente" };
};

module.exports = deleteAppointment;
