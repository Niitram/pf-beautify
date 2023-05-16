const { Category } = require("../../db");

const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  await category.destroy();
  return category;
};

module.exports = deleteCategory;
