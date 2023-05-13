const { Client } = require("../../db");

const postClient = async (password, email, name) => {
  const client = await Client.findOrCreate({
    where: { email: email },
    defaults: {
      fullName: name[0].toUpperCase() + name.slice(1),
      password: password,
    },
  });
<<<<<<< HEAD
  return client;
=======
  return client[0].dataValues;
>>>>>>> 44d0cb2ba1cbd8de19ed042aae7e078772f0e7e5
};

module.exports = postClient;
