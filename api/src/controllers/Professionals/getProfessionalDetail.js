const { Professional } = require("../../db");

const getProfessionalDetail = async (id) => {
  const profDetail = await Professional.findByPk(id);
  return profDetail;
};

module.exports = getProfessionalDetail;
