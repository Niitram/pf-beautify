const { SavedCart } = require("../../db");

const deleteSavedCart = async (clientId) => {
  const cart = await SavedCart.findOne({ where: { ClientId: clientId } });
  if (cart) {
    await cart.destroy();
    return true;
  }
  return false;
};

module.exports = deleteSavedCart;
