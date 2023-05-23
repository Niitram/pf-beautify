const { SavedCart } = require("../../db");

const postSavedCart = async (clientId, productsIds) => {
  const oldCart = await SavedCart.findOne({ where: { ClientId: clientId } });
  if (oldCart) await oldCart.destroy();

  const newCart = await SavedCart.create();
  await newCart.setClient(clientId);
  await newCart.addProducts(productsIds);
  return newCart;
};

module.exports = postSavedCart;
