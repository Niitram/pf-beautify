const { Appointment, Client, Professional, Service } = require("../../db.js");

const getAppoinmentsByService = async (serviceId) => {
  const appointmentByService = await Appointment.findAll({
    where: { ServiceId: serviceId },
    include: [
      { model: Professional, attributes: ["fullname"] },
      { model: Client, attributes: ["fullName"] },
      { model: Service, attributes: ["name"] },
    ],
  });
  return appointmentByService;
};

module.exports = getAppoinmentsByService;
