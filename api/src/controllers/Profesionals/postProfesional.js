const { Profesional, Service } = require("../../db");

const postProfesional = async (fullname, mail, direction, image, serviceId) => {
  fullname = fullname[0].toUpperCase() + fullname.slice(1);
  const newProfesional = await Profesional.create({
    fullname,
    mail,
    direction,
    image,
  });
  await newProfesional.addService(serviceId);
  const createdProfesional = await Profesional.findByPk(newProfesional.id, {
    include: {
      model: Service,
      attributes: ["name"],
    },
  });

  const optimizedNewProfesional = {
    id: createdProfesional.id,
    fullname: createdProfesional.fullname,
    mail: createdProfesional.mail,
    direction: createdProfesional.image,
    service: createdProfesional.Services[0].name,
  };
  return optimizedNewProfesional;
};

module.exports = postProfesional;
