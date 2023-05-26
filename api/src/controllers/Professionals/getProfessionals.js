const { Professional, Service } = require("../../db");

const getProfessionals = async () => {
  const response = await Professional.findAll({
    include: {
      model: Service,
      attributes: ["name"],
    },
  });
  return response;
};

module.exports = getProfessionals;
