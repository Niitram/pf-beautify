const { SavedCart, Client, Product } = require("../db");

const getCartValidation = async (req, res, next) => {
  const clientId = Number(req.params.clientId);

  if (String(clientId) === "NaN")
    return res.status(400).json({ error: "clientId must be a number" });

  if (clientId !== Math.floor(clientId))
    return res.status(400).json({ error: "clientId must be an integer" });

  const client = await Client.findByPk(clientId);
  if (!client) return res.status(400).json({ error: "client not found" });

  next();
};

const postCartValidation = async (req, res, next) => {
  const clientId = Number(req.params.clientId);
  const { products } = req.body;

  //* validaciones del cliente
  if (String(clientId) === "NaN")
    return res.status(400).json({ error: "clientId must be a number" });

  if (clientId !== Math.floor(clientId))
    return res.status(400).json({ error: "clientId must be an integer" });

  const client = await Client.findByPk(clientId);
  if (!client) return res.status(400).json({ error: "client not found" });

  //* validaciones de los productos
  for (const { id, quantity } of products) {
    if (String(id) === "NaN")
      return res.status(400).json({ error: "product id must be a number" });

    if (id !== Math.floor(id))
      return res.status(400).json({ error: "product id must be an integer" });

    if (String(quantity) === "NaN")
      return res
        .status(400)
        .json({ error: "product quantity must be a number" });

    if (quantity !== Math.floor(quantity))
      return res
        .status(400)
        .json({ error: "product quantity must be an integer" });

    const product = await Product.findByPk(id);
    if (!product) return res.status(400).json({ error: "product not found" });
  }

  next();
};

const deleteCartValidation = async (req, res, next) => {
  const clientId = Number(req.params.clientId);

  if (String(clientId) === "NaN")
    return res.status(400).json({ error: "clientId must be a number" });

  if (clientId !== Math.floor(clientId))
    return res.status(400).json({ error: "clientId must be an integer" });

  const client = await Client.findByPk(clientId);
  if (!client) return res.status(400).json({ error: "client not found" });

  next();
};
module.exports = {
  getCartValidation,
  postCartValidation,
  deleteCartValidation,
};
