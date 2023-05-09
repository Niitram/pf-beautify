const productos = require("./productos.json");
const { Product, Category } = require("../db.js");

const bulkCreateProducts = async (req, res) => {
  try {
    //* checking there are not products in the database
    const oldProducts = await Product.findAll();
    if (oldProducts.length) return;

    for (let product of productos) {
      const newProduct = await Product.create(product);
      const category = await Category.findOne({
        where: { name: product.category },
      });

      if (!category) newProduct.createCategory({ name: product.category });
      else newProduct.setCategory(category.dataValues.id);
    }

    console.log("Productos agregados a la base de datos!");
  } catch (error) {
    console.error(
      "Error al agregar productos a la base de datos:",
      error.message
    );
  }
};

module.exports = bulkCreateProducts;
