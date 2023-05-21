const { Client } = require("../../db");
const sendMail=require('../../config-email/sendMail.js');


const postClient = async ( email, name) => {
  const client = await Client.findOrCreate({
    where: { email: email },
    defaults: {
      fullName: name[0].toUpperCase() + name.slice(1),
    },
  });


  sendMail(email,client[0].fullName)

  return client[0].dataValues;
};

module.exports = postClient;