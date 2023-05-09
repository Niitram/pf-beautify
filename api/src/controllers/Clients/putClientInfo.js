const { Client } = require("../../db");

const putClientInfo = async (id, adress, phone) => {
    const toModifyclient = await Client.findByPk(id)
    toModifyclient.update({
        adress,
        phone
    })
    return toModifyclient
  };


  module.exports = putClientInfo