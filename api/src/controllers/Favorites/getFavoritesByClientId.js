const { Client, Category } = require("../../db");

const getFavoritesByClientId = async (clientId) => {
  const client = await Client.findByPk(clientId);
  const favorites = await client.getProducts();

  const categorys = await Category.findAll();

  const newFavorites = favorites.map((product) => {
    const newFavorite = {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      discount: product.discount,
      stock: product.stock,
      state: product.state,
      rate: product.finalRate,
    };

    categorys.forEach((category) => {
      if (category.id === product.CategoryId)
        newFavorite.category = category.name;
    });
    return newFavorite;
  });
  return newFavorites;
};

module.exports = getFavoritesByClientId;
