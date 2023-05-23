const bulkCreateClients = require("./clients");
const bulkCreateDevelopers = require("./developersData");
const bulckCreateFavorites = require("./favorites");
const bulkCreateProducts = require("./productsData");
const bulkCreateProfesionalsAndServices = require("./services");
const bulkCreateShops = require("./shops");
const { Product } = require("../db");

const allDataFunctions = async () => {
  //* checking there are not products in the database
  const oldProducts = await Product.findAll();
  if (oldProducts.length) {
    console.log("db is alredy fullfilled");
    return;
  }
  await bulkCreateProducts();
  await bulkCreateDevelopers();
  await bulkCreateClients();
  await bulkCreateShops();
  await bulckCreateFavorites();
  await bulkCreateProfesionalsAndServices();
};

module.exports = allDataFunctions;
