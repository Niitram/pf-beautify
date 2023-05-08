const { Product } = require("../db");

const getProducts = async (name) => {
  const products = name
    ? await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      })
    : await Product.findAll();

  const filteredProducts = products.map(
    ({ id, name, image, price, discount, CategoryId, stock }) => {
      return {
        id,
        name,
        image,
        price,
        discount,
        categoryId: CategoryId,
        stock,
      };
    }
  );
  return filteredProducts;
};

module.exports = getProducts;
