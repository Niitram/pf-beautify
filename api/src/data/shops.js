const postNewShop = require("../controllers/Shops/postNewShop");
const { Shop } = require("../db");
const shops = require("./shops.json");

const bulkCreateShops = async () => {
  try {
    for (const shop of shops) {
      await postNewShop(shop);
    }
    console.log("Se han cargado las compras al servidor");
  } catch (error) {
    console.log("no se han podido cargar las compras al servidor");
    console.log(error.message);
  }
};

module.exports = bulkCreateShops;
