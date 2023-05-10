const { Service } = require("../../db");

const getService = async () => {
  const servicesInfo = [];
  const services = await Service.findAll();
  services.forEach((service) => {
    servicesInfo.push({
      name: service.name,
      image: service.image,
      description: service.description,
      rate: service.rate,
      professional: service.professionalId,
      price: service.price,
    });
  });
  return services;
};

module.exports = getService;

