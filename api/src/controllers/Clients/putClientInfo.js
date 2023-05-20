const { Client } = require("../../db");

const putClientInfo = async (id, newValues) => {
    const toModifyclient = await Client.findByPk(id)
    for (key in newValues){
        await toModifyclient.update(
             {
                 [key]: newValues[key]
             }
         )
 }
    return toModifyclient
  };


  module.exports = putClientInfo