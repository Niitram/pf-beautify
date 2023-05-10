const { Profesional } = require("../../db");

const getProfesionalDetail = async (id) => {
  const profDetail = await Profesional.findByPk(id);
  return profDetail;
};  

module.exports = getProfesionalDetail;
