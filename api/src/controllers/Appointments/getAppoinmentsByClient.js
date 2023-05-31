const { Appointment, Profesional, Service } = require("../../db.js");

const getAppointmentByClient = async (clientId) => {
  const appointments = await Appointment.findAll({
    where: { ClientId: clientId },
    include: [
      { model: Profesional, attributes: ["fullname"] },
      { model: Service, attributes: ["id", "name"] },
    ],
  });
  return appointments;
};

module.exports = getAppointmentByClient;
