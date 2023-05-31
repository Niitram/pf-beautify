const { Client } = require("../../db");
const signUpMail = require('../../config-email/signUpMail')
const findOrCreateClient = async (email, fullName, image, phone, adress) => {
  let client = await Client.findOne({ where: { email } });
  if (!client){
    client = await Client.create({
      email,
      fullName: fullName ? fullName : null,
      image: image ? image : null,
      phone: phone ? phone : null,
      adress: adress ? adress : null,
    });
    await signUpMail(fullName, client.email)
    return client
}else {
    return client;
}
  
};
module.exports = findOrCreateClient;
