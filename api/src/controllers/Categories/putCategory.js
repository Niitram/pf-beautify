const { Category } = require("../../db");

const putCategory = async (id, name) => {
  const oldCategory = await Category.findByPk(id);
  const newName = name[0].toUpperCase() + name.slice(1);
  const newCategory = await oldCategory.update({ name: newName });
  return newCategory;
};

module.exports = putCategory;
