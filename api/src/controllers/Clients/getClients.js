const { Client } = require("../../db");


const getClients = async () => {
    const clients = await Client.findAll()
    return clients
}


module.exports = getClients