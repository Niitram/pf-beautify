const { Category } = require("../../db");

const postCategory = async (name) => {
  name = name[0].toUpperCase() + name.slice(1);
  const newCategory = await Category.create({ name });
  return newCategory;
};

module.exports = postCategory;
