const { Product, Category } = require("../../db");

const updateProduct = async (id, propertys) => {
  if (propertys.name)
    propertys.name = propertys.name[0].toUpperCase() + propertys.name.slice(1);
  if (propertys.category)
    propertys.category =
      propertys.category[0].toUpperCase() + propertys.category.slice(1);
  if (propertys.description)
    propertys.description =
      propertys.description[0].toUpperCase() + propertys.description.slice(1);

  const product = await Product.findByPk(id);
  const updatedProduct = await product.update(propertys);

  if (propertys.category) {
    const [category, created] = await Category.findOrCreate({
      where: { name: propertys.category },
    });
    updatedProduct.setCategory(category.id);
  }

  const category = await Category.findByPk(updatedProduct.CategoryId);

  const finalProduct = {
    id,
    name: updatedProduct.name,
    rate: updatedProduct.finalRate,
    description: updatedProduct.description,
    image: updatedProduct.image,
    price: updatedProduct.price,
    discount: updatedProduct.discount,
    stock: updatedProduct.stock,
    category: category.name,
    state: updatedProduct.state,
  };
  return finalProduct;
};

module.exports = updateProduct;
