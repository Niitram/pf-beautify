const { Op } = require("sequelize");
const { Product } = require("../db");

const updateProductValidation = async (req, res, next) => {
  const propertys = req.body;
  const id = Number(req.params.id);

  if (String(id) === "NaN")
    return res.status(400).json({ error: "Id must be a number" });

  if (!Object.keys(propertys).length)
    return res.status(400).json({ error: "Nothing to update" });

  for (const property in propertys) {
    if (["name", "description", "image"].includes(property)) {
      if (typeof propertys[property] !== "string")
        return res.status(400).json({ error: `${property} must be a string` });

      if (propertys[property].length > 255)
        return res
          .status(400)
          .json({ error: `${property} can't have more than 255 characters` });
    }

    if (["price", "stock", "discount"].includes(property)) {
      if (String(Number(propertys[property])) === "NaN")
        return res.status(400).json({ error: `${property} must be a number` });
      if (
        property === "stock" &&
        propertys.stock !== Math.floor(propertys.stock)
      )
        return res.status(400).json({ error: "stock must be an integer" });
    }
  }
  if (typeof propertys.state !== "boolean")
    return res.status(400).json({ error: "state must be a boolean" });

  if (propertys.rate)
    return res
      .status(401)
      .json({ error: "Don't have permission to change rate" });

  try {
    const product = await Product.findByPk(id);


    if (!product) return res.status(404).json({ error: "product not found" });

    if (propertys.name) {
      const oldProduct = await Product.findOne({
        where: { name: { [Op.iLike]: propertys.name } },
      });
      if (oldProduct && oldProduct.id !== id)
        return res.status(400).json({ error: "Product name alredy exists" });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

module.exports = updateProductValidation;
