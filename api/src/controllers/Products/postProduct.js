const { Product, Category } = require("../../db");

const postProduct = async (product) => {
  let newProduct = await Product.create(product);

  if (!product.category) return newProduct;

  const productCategory = await Category.findOne({
    where: { name: product.category },
  });
  if (productCategory) newProduct.setCategory(productCategory.dataValues.id);
  else await newProduct.createCategory({ name: product.category });

  return newProduct;
};

module.exports = postProduct;
