const { Appointment, Profesional, Service } = require("../../db.js");

const getAppointmentByClient = async (clientId) => {
  const appointments = await Appointment.findAll({
    where: { ClientId: clientId },
    include: [
      { model: Profesional, attributes: ["fullname"] },
      { model: Service, attributes: ["name", "image"] },
    ],
  });
  return appointments;
};

module.exports = getAppointmentByClient;
