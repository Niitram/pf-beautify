const { Client } = require("../../db");

const findOrCreateClient = async (email, fullName, image, phone, adress) => {
  console.log(email);
  let client = await Client.findOne({ where: { email } });
  console.log(client);
  if (!client)
    client = await Client.create({
      email,
      fullName: fullName ? fullName : null,
      image: image ? image : null,
      phone: phone ? phone : null,
      adress: adress ? adress : null,
    });

  return client;
};
module.exports = findOrCreateClient;
