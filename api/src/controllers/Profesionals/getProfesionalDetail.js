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
  return profDetail;
};

module.exports = getProfesionalDetail;
