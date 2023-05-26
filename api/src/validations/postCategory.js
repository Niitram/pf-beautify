const { Category } = require("../db");

const postCategoryValidation = async (req, res, next) => {
  const { name } = req.body;
  if (!name || !name.length)
    return res.status(400).json({ error: "name required" });

  if (typeof name !== "string")
    return res.status(400).json({ error: "name must be a string" });

  if (name.length > 255)
    return res.status(400).json({ error: "name too long" });

  const oldName = name[0].toUpperCase() + name.slice(1);

  const oldCategory = await Category.findOne({ where: { name: oldName } });
  if (oldCategory)
    return res.status(400).json({ error: "category alredy exists" });
  next();
};

module.exports = postCategoryValidation;
