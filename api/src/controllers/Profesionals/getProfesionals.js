const { Profesional } = require("../../db");

const getProfesionals = async () => {
  const response = await Profesional.findAll();
  return response;
};

module.exports = getProfesionals;
