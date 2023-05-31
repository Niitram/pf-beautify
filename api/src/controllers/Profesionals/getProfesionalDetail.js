const { Profesional, Appointment, Service } = require("../../db");

const getProfesionalDetail = async (id) => {
  const profDetail = await Profesional.findByPk(id, {
    include: [
      {
        model: Appointment,
        attributes: ["date", "hour"],
      },
      {
        model: Service,
        attributes: ["name"],
      },
    ],
  });
  const newProfessional = {
    id: profDetail.id,
    fullname: profDetail.fullname,
    mail: profDetail.mail,
    direction: profDetail.direction,
    image: profDetail.image,
    appointments: profDetail.Appointments,
    service: profDetail.Services[0].name,
  }
  return newProfessional;
};

module.exports = getProfesionalDetail;
