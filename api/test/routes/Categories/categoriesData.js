const {  Category } = require("../../../src/db");

const createCategories = async () => {
    const newCategory = await Category.create({ name: "TestCategory" });
    return newCategory.dataValues;
  };


const deleteAllTestData = async () => {
    const category =  await Category.findOne({where: {name: 'TestCategory'}})
    category.destroy()
}

  module.exports = {createCategories, deleteAllTestData }