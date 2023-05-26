const bulkCreateClients = require("./clients");
const bulkCreateDevelopers = require("./developersData");
const bulckCreateFavorites = require("./favorites");
const bulkCreateProducts = require("./productsData");
const bulkCreateProfessionalsAndServices = require("./services");
const bulkCreateShops = require("./shops");
const { Product } = require("../db");
const bulkCreateAppointments = require("./appointments");

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
  await bulkCreateProfessionalsAndServices();
  await bulkCreateAppointments();
};

module.exports = allDataFunctions;
