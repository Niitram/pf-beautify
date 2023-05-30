const postForBulkCreate = require("../controllers/Shops/postForBulkCreate");
const { Shop } = require("../db");
const shops = require("./shops.json");

const bulkCreateShops = async () => {
  try {
    for (const shop of shops) {
      await postForBulkCreate(shop);
    }
    console.log("Se han cargado las compras al servidor");
  } catch (error) {
    console.log("no se han podido cargar las compras al servidor");
    console.log(error.message);
  }
};

module.exports = bulkCreateShops;
