const { Product, Client } = require("../db");

const postNewShopValidation = async (req, res, next) => {
  const { amount, discount, clientId, details } = req.body;
  const numericVars = [amount, discount, clientId];

  //* chequea que amount, discount y clientId sean variables numéricas
  if (!numericVars.every((element) => String(Number(element)) !== "NaN"))
    return res
      .status(400)
      .json({ error: "amount, discount and clientId must be numbers" });

  //*chequea que clientId sea un número entero
  if (clientId !== Math.floor(clientId))
    return res.status(400).json({ error: "clientId must be an Integer" });

  //* chequea que el array de detalles no esté vacío
  if (!details.length)
    return res
      .status(400)
      .json({ error: "must have at least one product detail" });

  //* chequea que no falte info en los details y que las variables sean del tipo correcto
  for (const { productId, price, count } of details) {
    if (
      ![productId, price, count].every(
        (element) => String(Number(element)) !== "NaN"
      )
    )
      return res
        .status(400)
        .json({ error: "price, count and productId must be numbers" });

    if (productId !== Math.floor(productId) || count !== Math.floor(count))
      return res
        .status(400)
        .json({ error: "count and productId must be Integers" });
  }

  try {
    //*chequea que el cliente exista
    const client = await Client.findByPk(clientId);
    if (!client)
      return res.status(404).json({ error: "Client doesn't exists" });

    //* en cada detalle de producto, chequea que el producto exista
    const promises = details.map(async (detail) => {
      const product = await Product.findByPk(detail.productId);
      if (!product) return false;

      if (product.stock < detail.count) return false;
      return true;
    });

    const hasDetailProducts = await Promise.all(promises);
    if (!hasDetailProducts.every(Boolean))
      return res
        .status(409)
        .json({ error: "Some product wasn't found or has not enough stock" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

module.exports = postNewShopValidation;
