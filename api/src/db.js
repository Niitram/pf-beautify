require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/beautify`,
  {
   
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//Creamos relaciones de la bdd
const { Product, Category,Client,Admin,Comment,Profesional,Service,Favorite } = sequelize.models;

//*Relaciones entre los modelos Category y Product
Category.hasMany(Product);

Product.belongsTo(Category);


//* Relaciones entre el modelo Comment (Comentarios) con Product y Client
Comment.belongsTo(Client, { as: 'user', foreignKey: 'id' });
Comment.belongsTo(Product, { as: 'product', foreignKey: 'id' });
Product.hasMany(Comment, { as: 'comments' });
Client.hasMany(Comment, { as: 'comments' });

//*Relaciones entre el modelo Service y Profesional
Service.belongsTo(Profesional, { as: "profesional", foreignKey: "id" });
Profesional.hasMany(Service, { as: "service", foreignKey: "id" });

//* Relacion del modelo Favorite con los modelos Client y Product
Favorite.belongsTo(Client);
Favorite.belongsTo(Product);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
