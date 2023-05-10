const profesionals = require("./services.json");
const { Profesional, Service } = require("../db.js");

const bulkCreateProfesionalsAndServices = async () => {
  try {
    for (let expert of profesionals) {
      const newProfessional = await Profesional.create({
        fullname: expert.fullname,
        mail: expert.mail,
        direccion: expert.direccion,
        image: expert.image,
      });

      for (let service of professional.services) {
        const [newService, created] = await Service.findOrCreate({
          where: { name: service.name },
          defaults: {
            description: service.description,
            price: service.price,
            image: service.image,
            rate: service.rate,
          },
        });

        await newProfessional.addService(newService);
      }
    }
    console.log("Profesionales y servicios agregados a la base de datos!");
  } catch (error) {
    console.error(
      "Error al agregar profesionales y servicios a la base de datos:",
      error.message
    );
  }
};


module.exports =  bulkCreateProfesionalsAndServices



