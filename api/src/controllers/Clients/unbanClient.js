const { Client } = require("../../db");

const unbanClient = async (clientId) => {
  const client = await Client.findByPk(clientId);
  client.update({ banned: false });
  return client;
};

module.exports = unbanClient;
