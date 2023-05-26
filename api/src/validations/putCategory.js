const { Category } = require("../db");

const putCategoryValidation = async (req, res, next) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (String(id) === "NaN")
    return res.status(400).json({ error: "id must be a number" });

  if (id !== Math.floor(id))
    return res.status(400).json({ error: "id must be an integer" });

  if (!name || !name.length)
    return res.status(400).json({ error: "name required" });

  if (typeof name !== "string")
    return res.status(400).json({ error: "name must be a string" });

  if (name.length > 255)
    return res.status(400).json({ error: "name too long" });

  const oldCategory = await Category.findByPk(id);
  if (!oldCategory)
    return res.status(404).json({ error: "category doesn't exists" });

  next();
};

module.exports = putCategoryValidation;
