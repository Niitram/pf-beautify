const { Appointment, Professional, Client, Service } = require("../../db.js");

const getAppointmentsByAdmin = async () => {
  const allAppointments = await Appointment.findAll({
    include: [
      { model: Professional, attributes: ["fullname"] },
      { model: Client, attributes: ["fullName"] },
      { model: Service, attributes: ["name"] },
    ],
  });

  return allAppointments;
};

module.exports = getAppointmentsByAdmin;
