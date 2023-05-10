const { Category } = require("../../db");

const getCategories = async () => {
  const arrayOfCategories = [];
  const categories = await Category.findAll();
  categories.forEach((category) => {
    arrayOfCategories.push(category.name);
  });
  return arrayOfCategories;
};

module.exports = getCategories;

