const { Client } = require("../../db");


const getClientById = async (id) => {
    const client = await Client.findByPk(id)
    return client.dataValues
}

module.exports = getClientById