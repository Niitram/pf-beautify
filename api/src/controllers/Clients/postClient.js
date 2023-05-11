const { Client } = require("../../db");

const postClient = async (password, email, name) => {
  const client = await Client.findOrCreate({
    where: { email: email },
    defaults: {
      fullName: name,
      password: password,
    },
  });
  return client;
};

module.exports = postClient;

