const { Profesional,Service } = require("../../db");

const getProfesionals = async () => {
  const response = await Profesional.findAll({
    include: {
      model: Service,
      attributes: ['name']
    }
  });
  return response;
};

module.exports = getProfesionals;
