const server = require("./src/app.js");
const bulkCreateClients = require("./src/data/clients.js");
const bulkCreateDevelopers = require("./src/data/developersData.js");
const bulkCreateProducts = require("./src/data/productsData.js");
const bulkCreateShops = require("./src/data/shops.js");
const { conn } = require("./src/db.js");
const bulkCreateProfesionalsAndServices = require("./src/data/services.js")
// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console

    await bulkCreateProducts();
    await bulkCreateDevelopers();
    await bulkCreateClients();
    await bulkCreateShops();

  });
});
