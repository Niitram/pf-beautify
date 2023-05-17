const { Category, Product } = require("../db");

const deleteCategoryValidation = async (req, res, next) => {
  const id = Number(req.params.id);
  if (String(id) === "NaN")
    return res.status(400).json({ error: "id must be a number" });
  if (!id) return res.status(400).json({ error: "id required" });
  if (Math.floor(id) !== id)
    return res.status(400).json({ error: "id must be an integer" });

  const oldCategory = await Category.findByPk(id);
  if (!oldCategory)
    return res.status(404).json({ error: "category not found" });

  const relatedProducts = await Product.findAll({ where: { CategoryId: id } });
  if (relatedProducts.length)
    return res.status(409).json({ error: "category has related products" });

  next();
};

module.exports = deleteCategoryValidation;
