const categories = require("./categories.json");
const { Category} = require("../db.js");

const categoriesForDataBase = async () => {
    try {
       
        for (let nombreCategory of categories) {
            await Category.create(nombreCategory);
        }

        console.log("Las Categorias fueron agregadas a la base de datos!");

    } catch (error) {
        console.error("Error al agregar categorias a la base de datos:", error);

    }
}

module.exports = {
    categoriesForDataBase 
}