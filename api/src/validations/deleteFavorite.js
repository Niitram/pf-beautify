const { Product, Client } = require("../db");

const deleteFavoritesValidation = async (req, res, next) => {
  const [clientId, productId] = [
    Number(req.body.clientId),
    Number(req.body.productId),
  ];

  if (!clientId || !productId)
    return res.status(400).json({ error: "Incorrect data" });

  if (clientId !== Math.floor(clientId) || productId !== Math.floor(productId))
    return res.status(400).json({ error: "Ids must be integers" });

  const product = await Product.findByPk(productId);
  const client = await Client.findByPk(clientId);

  if (!product) return res.status(404).json({ error: "Product not found" });
  if (!client) return res.status(404).json({ error: "Client not found" });

  const favorites = await client.getProducts({
    attributes: ["id"],
    raw: true,
  });

  let existent = false;
  for (const favorite of favorites) {
    if (favorite.id === productId) existent = true;
  }
  if (!existent) return res.status(404).json({ error: "Favorite not found" });

  next();
};
module.exports = deleteFavoritesValidation;
