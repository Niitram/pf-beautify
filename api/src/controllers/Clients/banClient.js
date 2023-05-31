const { Client } = require("../../db");

const banClient = async (clientId) => {
  const client = await Client.findByPk(clientId);
  client.update({ banned: true });
  return client;
};

module.exports = banClient;
