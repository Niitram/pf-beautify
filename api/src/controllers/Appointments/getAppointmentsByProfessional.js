const { Appointment, Professional, Service, Client } = require("../../db.js");

const getAppointmentByProfessional = async (professionalId) => {
  const appointments = await Appointment.findAll({
    where: { ProfessionalId: professionalId },
    include: [
      { model: Professional, attributes: ["fullname"] },
      { model: Service, attributes: ["name"] },
      { model: Client, attributes: ["fullName"] },
    ],
  });
  return appointments;
};

module.exports = getAppointmentByProfessional;
