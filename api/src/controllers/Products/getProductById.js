const { Product, Category, Comment } = require("../../db");
const getCommentsByProductId = require("../Comments/getCommentsByProductId");

const getProductById = async (id) => {
  const product = await Product.findByPk(id, {
    include: { model: Category },
  });
  const comments = await getCommentsByProductId(id);
  const newProduct = {
    id,
    name: product.name,
    description: product.description,
    image: product.image,
    price: product.price,
    discount: product.discount,
    stock: product.stock,
    state: product.state,
    rate: product.finalRate,
    category: product.Category.name,
    comments,
  };

  return newProduct;
};

module.exports = getProductById;
