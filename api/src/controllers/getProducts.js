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

  return products;
};

module.exports = getProducts;
