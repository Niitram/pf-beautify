const { SavedCart, Product, CartsProducts } = require("../../db");

const getSavedCartByClientId = async (clientId) => {
  const cart = await SavedCart.findOne({
    where: { ClientId: clientId },
    include: {
      model: Product,
      attributes: [
        "description",
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
    ({ description, id, name, price, image, discount, state, stock, CartsProducts }) => {
      return {
        description,
        discount,
        id,
        image,
        name,
        price,
        quantity: CartsProducts.quantity > stock ? stock : CartsProducts.quantity,
        state,
        stock,
        // oldQuantity: CartsProducts.quantity,
        // newQuantity:
        //   CartsProducts.quantity > stock ? stock : CartsProducts.quantity,
      };
    }
  );

  return newProducts;
};

module.exports = getSavedCartByClientId;
