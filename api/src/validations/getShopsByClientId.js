const { Client } = require("../db");

const getShopsByClientIdValidation = async (req, res, next) => {
  const clientId = Number(req.params.clientId);
  if (String(clientId) === "NaN" || clientId !== Math.floor(clientId))
    return res.status(400).json({ error: "Client Id must be an integer" });

  const client = await Client.findByPk(clientId);
  if (!client) return res.status(404).json({ error: "Client not found" });
  next();
};

module.exports = getShopsByClientIdValidation;
