const productos = require("./productos.json");
const { Product } = require("../db.js");

const productForDataBase = async () => {
    try {
       
        for (let product of productos) {
            await Product.create(product);
        }

        console.log("Productos agregados a la base de datos!");

    } catch (error) {
        console.error("Error al agregar productos a la base de datos:", error);

    }
}

module.exports = {
    productForDataBase
}