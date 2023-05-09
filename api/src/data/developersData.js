const { Developer } = require("../db");
const developers = require("./developers.json");

const bulkCreateDevelopers = async () => {
  try {
    await Developer.bulkCreate(developers);
    console.log("Se han cargado los developers a la base de datos");
  } catch (error) {
    console.log("No se han podido cargar los developers a la base de datos");
    console.log(error.message);
  }
};

module.exports = bulkCreateDevelopers;
