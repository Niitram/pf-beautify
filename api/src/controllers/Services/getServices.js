const { Service, Profesional } = require("../../db");

const getService = async () => {
  const servicesInfo = [];
  const services = await Service.findAll({
    include: { model: Profesional, attributes: ["fullname"] },
  });
  services.forEach((service) => {
    servicesInfo.push({
      id: service.id,
      name: service.name,
      image: service.image,
      description: service.description,
      rate: service.rate,
      professional: service.Profesional.fullname,
      price: service.price,
      duration: service.duration,
    });
  });
  return servicesInfo;
};

module.exports = getService;
