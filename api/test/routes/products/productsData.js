const { Product, Category } = require("../../../src/db");

const generateProducts = () => {
  const products = [
    {
      name: "ProductTest1",
      description: "Description1",
      image: "imageLink1",
      price: 1,
      discount: 1,
      stock: 1,
      state: "state1",
      category: 'TestCategory',
      rate: 1
    },
    {
      name: "ProductTest2",
      description: "Description2",
      image: "imageLink2",
      price: 2,
      discount: 2,
      stock: 2,
      state: "state2",
      category: 'TestCategory',
      rate: 2
    },
    {
      name: "ProductTest3",
      description: "Description3",
      image: "imageLink3",
      price: 3,
      discount: 3,
      stock: 3,
      state: "state3",
      category: 'TestCategory',
      rate: 3
    },
    {
      name: "ProductTest4",
      description: "Description4",
      image: "imageLink4",
      price: 4,
      discount: 4,
      stock: 4,
      state: "state4",
      category: 'TestCategory',
      rate: 4
    },
  ];
  //await Product.bulkCreate(products);
  return products
};

const createCategories = async () => {
  const newCategory = await Category.create({ name: "TestCategory" });
  return newCategory.dataValues;
};

const setCategories = async (product) => {
  const category = await Category.findOne({ where: { name: "TestCategory" } });
  await product.setCategory(category.dataValues.id);
  return product;
};

const getProductsId = async () => {
  const arrayId = [];
  for (let i = 0; i < 4; i++) {
    const product = await Product.findOne({
      where: { name: `ProductTest${i + 1}` },
    });
    arrayId.push(product.dataValues.id);
  }
  return arrayId;
};

const deleteAllTestData = async () => {
  const category = await Category.findOne({
    where: { name: `TestCategory` },
  });
  await category.destroy();

  for (let i = 0; i < 4; i++) {
    const product = await Product.findOne({
      where: { name: `ProductTest${i + 1}` },
    });
    await product.destroy();
  }
};

module.exports = {
  getProductsId,
  generateProducts,
  createCategories,
  setCategories,
  deleteAllTestData,
};
