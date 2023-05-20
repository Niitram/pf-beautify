const {Cart, Product} = require('../../db')
const axios = require('axios');
require('dotenv')
const  { ACESS_TOKEN} = process.env
const approvedFunction = async (id) => {
    const response = await axios.get(`https://api.mercadopago.com/checkout/preferences/${id}`, {
        headers: {
            Authorization: `Bearer ${ACESS_TOKEN}`
        }
    })
    const items = response.data.items
    items.forEach(async product => {
        const toModify = await Product.findOne({where: {name: product.description}})
    })
    return response.data.items
}


module.exports = approvedFunction

