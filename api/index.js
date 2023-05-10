const server = require("./src/app.js");
const bulkCreateProducts = require("./src/data/productsData.js");
const { conn } = require("./src/db.js");
const  bulkCreateProfesionalsAndServices=require("./src/data/services.js")
// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
   bulkCreateProducts();
   bulkCreateProfesionalsAndServices();
    require("./src/data/productsData.js")
  });

});
