const { SavedCart, Product, CartsProducts } = require("../../db");

const getSavedCartByClientId = async (clientId) => {
  const cart = await SavedCart.findOne({
    where: { ClientId: clientId },
    include: {
      model: Product,
      attributes: [
        "id",
        "name",
        "price",
        "image",
        "discount",
        "state",
        "stock",
      ],
      through: {
        model: CartsProducts,
        attributes: ["quantity"],
      },
    },
  });
  if (!cart) return [];
  const newProducts = cart.Products.map(
    ({ id, name, price, image, discount, state, stock, CartsProducts }) => {
      return {
        id,
        name,
        price,
        image,
        discount,
        state,
        stock,
        oldQuantity: CartsProducts.quantity,
        newQuantity:
          CartsProducts.quantity > stock ? stock : CartsProducts.quantity,
      };
    }
  );

  return newProducts;
};

module.exports = getSavedCartByClientId;
