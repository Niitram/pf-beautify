const { Product } = require("../db");

const productAddStock = async (req, res, next) => {
  const productId = Number(req.params.productId);
  const load = Number(req.body.load);

  //* chequea que el rate y la productId sean números
  if (String(load) === "NaN" || String(productId) === "NaN")
    return res
      .status(400)
      .json({ error: "Rate and productId must be numbers" });

  //* checkea que load sea un número entero
  if (load !== Math.floor(load))
    return res.status(400).json({ error: "Load must be an integer" });

  //* chequea que el producto exista
  const product = await Product.findByPk(productId);
  if (!product) return res.status(400).json({ error: "Product not found" });

  next();
};

module.exports = productAddStock;
