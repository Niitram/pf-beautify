const { Product, Category } = require("../../db");
const { Op } = require("sequelize");

const getProducts = async (name) => {
  const products = name
    ? await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Category,
      },
    })
    : await Product.findAll({
      include: {
        model: Category,
      },
    });

  const filteredProducts = products.map(
    ({ id, name, image, price, discount, Category, stock, finalRate }) => {
      return {
        id,
        name,
        image,
        price,
        discount,
        category: Category.name,
        stock,
        rate: finalRate,
      };
    }
  );
  return filteredProducts;
};

module.exports = getProducts;
