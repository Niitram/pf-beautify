const { Product } = require("../db");

const productAddRate = async (req, res, next) => {
  const productId = Number(req.params.productId);
  const rate = Number(req.body.rate);

  //* chequea que el rate y la productId sean números
  if (String(rate) === "NaN" || String(productId) === "NaN")
    return res
      .status(400)
      .json({ error: "Rate and productId must be numbers" });

  //* chequea que el rate esté entre 0 y 5
  if (rate < 0 || rate > 5)
    return res.status(400).json({ error: "Rate must be between 0 and 5" });

  //* chequea que el producto exista
  const product = await Product.findByPk(productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  next();
};

module.exports = productAddRate;
