const { SavedCart } = require("../../db");

const postSavedCart = async (clientId, products) => {
  const oldCart = await SavedCart.findOne({ where: { ClientId: clientId } });
  if (oldCart) await oldCart.destroy();

  if (!products.length) return { deleted: true };


  const newCart = await SavedCart.create();
  await newCart.setClient(clientId);

  products.forEach(async (product) => {
    if (!product.quantity) return;
    await newCart.addProduct(product.id, {
      through: { quantity: product.quantity },
    });
  });
  return newCart;
};

module.exports = postSavedCart;
