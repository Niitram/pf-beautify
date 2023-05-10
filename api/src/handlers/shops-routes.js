const { Router } = require("express");
const { Shop, ShopsDetail, Product } = require("../db");
const getAllShopsDetails = require("../controllers/Shops/getAllShopsDetails");
const getShopsByClient = require("../controllers/Shops/getShopsByClient");

const shopsRouter = Router();

shopsRouter.get("/shopsByClient/:clientId", async (req, res) => {
  try {
    const clientId = Number(req.params.clientId);
    const shops = await getShopsByClient(clientId);

    res.send(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//* esta ruta está pensada para que el admin pueda ver un detalle de todas las compras
shopsRouter.get("/allDetails", async (req, res) => {
  try {
    const shops = await getAllShopsDetails();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

shopsRouter.post("/", async (req, res) => {
  let newShop = await Shop.create({ amount: 50, discount: 0 });
  let newDetail = await ShopsDetail.create({ price: 25, count: 1 });
  newDetail.setProduct(1);
  newDetail.setShop(newShop.id);
  newShop.setClient(1);

  newShop = await Shop.create({ amount: 50, discount: 0 });
  newDetail = await ShopsDetail.create({ price: 25, count: 1 });
  newDetail.setProduct(2);
  newDetail.setShop(newShop.id);
  newShop.setClient(2);

  res.send("created");
});

module.exports = shopsRouter;
