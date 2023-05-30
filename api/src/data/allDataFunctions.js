const bulkCreateClients = require("./clients");
const bulkCreateDevelopers = require("./developersData");
const bulkCreateFavorites = require("./favorites");
const bulkCreateProducts = require("./productsData");
const bulkCreateProfesionalsAndServices = require("./services");
const bulkCreateShops = require("./shops");
const { Product } = require("../db");
const bulkCreateAppointments = require("./appointments");
const bulkCreateProductsComments = require("./productsComments");
const bulkCreateServicesComments = require("./servicesComments");

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
  await bulkCreateFavorites();
  await bulkCreateShops();
  await bulkCreateProfesionalsAndServices();
  await bulkCreateAppointments();
  await bulkCreateProductsComments();
  await bulkCreateServicesComments();
};

module.exports = allDataFunctions;
