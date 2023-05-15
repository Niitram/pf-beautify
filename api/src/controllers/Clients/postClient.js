const { Client } = require("../../db");

const postClient = async (password, email, name) => {
  const client = await Client.findOrCreate({
    where: { email: email },
    defaults: {
      fullName: name[0].toUpperCase() + name.slice(1),
      password: password,
    },
  });

  return client[0].dataValues;

};

module.exports = postClient;
