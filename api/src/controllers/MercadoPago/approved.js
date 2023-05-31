const { Purchase, Client } = require("../../db");
const axios = require("axios");
require("dotenv");
const { ACESS_TOKEN, BACK_ROUTE } = process.env;
const sendMailOnPurchase = require('../../config-email/sendMailByShop')
const approvedFunction = async (id, email) => {
  const response = await axios.get(
    `https://api.mercadopago.com/checkout/preferences/${id}`,
    {
      headers: {
        Authorization: `Bearer ${ACESS_TOKEN}`,
      },
    }
  );
  const purchase = await Purchase.findAll({ where: { clientMail: email } });
  purchase.forEach(async (each) => {
    await each.destroy();
  });
  const items = response.data.items;
  let totalAmount = 0;
  let itemsDetails = [];
  const client = await Client.findOne({ where: { email: email } });
  items.forEach(async (product) => {
    totalAmount = totalAmount + (product.unit_price * product.quantity);
  });
  items.forEach((product) => {
    if (product.id != 0) {
      itemsDetails.push({
        price: product.unit_price,
        count: product.quantity,
        productId: Number(product.id),
      });
    } else {
      client.update({ balance: 0 });
    }
  });

  const infoToSend = {
    amount: totalAmount,
    discount: 0,
    clientId: client.dataValues.id,
    details: itemsDetails,
  };

  const createPurchaseRecords = await axios.post(
    `${BACK_ROUTE}/shops`,
    infoToSend
  );
  await sendMailOnPurchase(client.dataValues.fullName, createPurchaseRecords.data, client.dataValues.email)
  return ;
};

module.exports = approvedFunction;
