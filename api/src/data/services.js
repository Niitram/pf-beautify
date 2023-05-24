//* Este archivo guarda toma el json services.json y por medio de la funcion bulkCreateProfesionalsAndServices guarda los datos del porfesional y su servicio en la DB.

const profesionals = require("./services.json");
const { Profesional, Service } = require("../db.js");

const bulkCreateProfesionalsAndServices = async () => {
  try {
    for (let profesional of profesionals) {
      const newProfessional = await Profesional.create({
        fullname: profesional.fullname,
        mail: profesional.mail,
        direction: profesional.direccion,
        image: profesional.image,
      });

      for (let service of profesional.services) {
        const [newService, created] = await Service.findOrCreate({
          where: { name: service.name },
          defaults: {
            description: service.description,
            price: service.price,
            image: service.image,
            rate: service.rate,
            duration: service.duration
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

module.exports = bulkCreateProfesionalsAndServices;
