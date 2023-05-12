const { Client } = require("../db.js");
const clients = require("./clients.json");

const bulkCreateClients = async () => {
  try {
    await Client.bulkCreate(clients);
    console.log("Se cargaron los clientes al servidor");
  } catch (error) {
    console.log("no se pudieron cargar los clientes al servidor");
    console.log(error.message);
  }
};

module.exports = bulkCreateClients;
