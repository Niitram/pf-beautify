const { Product, Category } = require("../../db");

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
    ({ id, name, image, price, discount, Category, stock }) => {
      return {
        id,
        name,
        image,
        price,
        discount,
        category: Category.name,
        stock,
      };
    }
  );
  return filteredProducts;
};

module.exports = getProducts;
