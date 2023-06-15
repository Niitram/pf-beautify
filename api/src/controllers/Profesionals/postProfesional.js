const { Profesional, Service } = require("../../db");
// name, price, description, image, duration
const postProfesional = async (fullname, mail, direction, image, service) => {
  fullname = fullname[0].toUpperCase() + fullname.slice(1);
  const newProfesional = await Profesional.create({
    fullname,
    mail,
    direction,
    image,
  });
  const newService = await Service.create(service);
  await newProfesional.addService(newService.id);

  const optimizedNewProfesional = {
    id: newProfesional.id,
    fullname: newProfesional.fullname,
    mail: newProfesional.mail,
    direction: newProfesional.image,
    service: newService.name,
  };
  return optimizedNewProfesional;
};

module.exports = postProfesional;
