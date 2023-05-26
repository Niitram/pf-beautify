//* Este archivo guarda toma el json services.json y por medio de la funcion bulkCreateProfesionalsAndServices guarda los datos del porfesional y su servicio en la DB.

const professionals = require("./services.json");
const { Professional, Service } = require("../db.js");

const bulkCreateProfessionalsAndServices = async () => {
  try {
    for (let professional of professionals) {
      const newProfessional = await Professional.create({
        fullname: professional.fullname,
        mail: professional.mail,
        direction: professional.direccion,
        image: professional.image,
      });

      for (let service of professional.services) {
        const [newService, created] = await Service.findOrCreate({
          where: { name: service.name },
          defaults: {
            description: service.description,
            price: service.price,
            image: service.image,
            rate: service.rate,
            duration: service.duration,
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

module.exports = bulkCreateProfessionalsAndServices;
