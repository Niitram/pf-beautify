const { Router } = require("express");
const getAllShopsDetails = require("../controllers/Shops/getAllShopsDetails");
const getShopsByClient = require("../controllers/Shops/getShopsByClient");
const postNewShop = require("../controllers/Shops/postNewShop");
const postNewShopValidation = require("../validations/postNewShop");
const getShopsByClientIdValidation = require("../validations/getShopsByClientId");

const shopsRouter = Router();

//* esta ruta está pensada para que los clientes tengan acceso a su historial de compras
shopsRouter.get(
  "/shopsByClient/:clientId",
  getShopsByClientIdValidation,
  async (req, res) => {
    try {
      const clientId = Number(req.params.clientId);
      const shops = await getShopsByClient(clientId);

      res.send(shops);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//* esta ruta está pensada para que el admin pueda ver un detalle de todas las compras
shopsRouter.get("/allDetails", async (req, res) => {
  try {
    const shops = await getAllShopsDetails();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

shopsRouter.post("/", postNewShopValidation, async (req, res) => {
  try {
    const shop = req.body;
    const newShop = await postNewShop(shop);
    res.status(201).json(newShop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = shopsRouter;
