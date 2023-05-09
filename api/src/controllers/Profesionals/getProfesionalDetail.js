const { Profesional } = require("../../db");

const getProfesionalDetail = async (id) => {
  const profDetail = await Profesional.findByPk(id);
  if (profDetail) {
    return profDetail;
  } else {
    throw new Error("No professional found");
  }
};

module.exports = getProfesionalDetail;
