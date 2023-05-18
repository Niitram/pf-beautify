const { Client } = require("../../db");


const getClientByEmail = async (email) => {
  const client = await Client.findOne({ where: { email } });
  return client.dataValues;
};

module.exports = getClientByEmail;

