const productos = require("./productos.json");
const { Product, Category } = require("../db.js");
const axios = require("axios");

const bulkCreateProducts = async (req, res) => {
  try {
    const apiProducts = await axios.get(
      "http://makeup-api.herokuapp.com/api/v1/products.json"
    );
    // const apiProducts = 0;
    if (!apiProducts) {
      for (let product of productos) {
        const newProduct = await Product.create(product);

        if (product.rate)
          await Product.update(
            { arrayRates: [product.rate] },
            { where: { id: newProduct.id } }
          );

        const category = await Category.findOne({
          where: { name: product.category },
        });

        if (!category) newProduct.createCategory({ name: product.category });
        else newProduct.setCategory(category.dataValues.id);
      }
      return;
    }

    const promise = apiProducts.data.map(
      async ({ name, price, image_link, description, category }) => {
        const apiPropertys = [name, image_link, category];
        if (!apiPropertys.every(Boolean)) return [null, null];
        apiPropertys.push(description);
        if (!apiPropertys.every((property) => property.length < 255))
          return [null, null];

        const fakeImages = [
          "benefitcosmetics",
          "imancosmetics",
          "amazonaws",
          "dior",
          "fentybeauty",
          "purpicks",
        ];
        for (const fakeImage of fakeImages) {
          if (image_link.includes(fakeImage)) return [null, null];
        }

        const random = Math.floor(Math.random() * 100);
        const productCategory = category[0].toUpperCase() + category.slice(1);
        const numericPrice = Number(price);

        const product = {
          name,
          price: numericPrice ? numericPrice : Math.random() * 15,
          description: description ? description : name,
          category: productCategory,
          image: image_link,
          discount: random > 50 ? null : numericPrice / 10,
          state: random > 950 ? false : true,
          stock: random < 10 ? random + 10 : random,
          rate: Math.random() * 5,
        };

        const newProduct = await Product.create(product);

        if (product.rate)
          await Product.update(
            { arrayRates: [product.rate] },
            { where: { id: newProduct.id } }
          );

        return [newProduct, productCategory];
      }
    );

    const newProducts = await Promise.all(promise);

    for (const [newProduct, productCategory] of newProducts) {
      if (!newProduct) continue;

      let dbCategory = await Category.findOne({
        where: { name: productCategory },
      });

      if (!dbCategory)
        dbCategory = await newProduct.createCategory({ name: productCategory });
      else await newProduct.setCategory(dbCategory.dataValues.id);
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
