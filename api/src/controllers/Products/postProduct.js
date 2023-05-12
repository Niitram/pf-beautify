const { Product, Category } = require("../../db");

const postProduct = async (product) => {
  product.name = product.name[0].toUpperCase() + product.name.slice(1);
  product.category =
    product.category[0].toUpperCase() + product.category.slice(1);
  product.description =
    product.description[0].toUpperCase() + product.description.slice(1);

  let newProduct = await Product.create(product);
  if (product.rate) {
    await Product.update(
      { arrayRates: [product.rate] },
      { where: { id: newProduct.id } }
    );
    newProduct = await Product.findByPk(newProduct.id);
  }

  if (!product.category) return newProduct;

  const productCategory = await Category.findOne({
    where: { name: product.category },
  });
  if (productCategory)
    await newProduct.setCategory(productCategory.dataValues.id);
  else await newProduct.createCategory({ name: product.category });

  return newProduct;
};

module.exports = postProduct;
