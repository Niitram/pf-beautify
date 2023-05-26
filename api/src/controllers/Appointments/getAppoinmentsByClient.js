const { Appointment, Professional, Service } = require("../../db.js");

const getAppointmentByClient = async (clientId) => {
  const appointments = await Appointment.findAll({
    where: { ClientId: clientId },
    include: [
      { model: Professional, attributes: ["fullname"] },
      { model: Service, attributes: ["name"] },
    ],
  });
  return appointments;
};

module.exports = getAppointmentByClient;
