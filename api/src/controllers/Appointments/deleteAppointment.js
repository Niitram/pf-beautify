const { Appointment, Service, Client } = require("../../db.js");

const deleteAppointment = async (appointmentId) => {
  const appointment = await Appointment.findByPk(appointmentId, {
    include: {
      model: Service,
      attributes: ["price"],
    },
  });
  const client = await Client.findByPk(appointment.ClientId);

  if (appointment.paid) {
    await client.update({
      balance: (client.balance || 0) - appointment.Service.price,
    });
  }
  await appointment.destroy();
  return { message: "Cita eliminada correctamente" };
};

module.exports = deleteAppointment;
