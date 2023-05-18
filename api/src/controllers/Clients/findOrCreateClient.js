const { Client } = require("../../db");

const findOrCreateClient = async (email, fullName) => {
  const client = fullName
    ? await Client.findOrCreate({ where: { email, fullName } })
    : await Client.findOrCreate({ where: { email } });

  console.log(client);
  return client;
};
module.exports = findOrCreateClient;
