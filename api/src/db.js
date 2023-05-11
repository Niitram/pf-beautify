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
// aqui paso eber para dejarles la extencion ajajaa gracias!
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


const {
  Product,
  Category,
  Client,
  Comment,
  Profesional,
  Service,
  ShopsDetail,
  Shop,
  Appointment
} = sequelize.models;


//*Relaciones entre los modelos Category y Product
Category.hasMany(Product);
Product.belongsTo(Category);

//* Relaciones entre el modelo Comment (Comentarios) con Product y Client
Comment.belongsTo(Client);
Comment.belongsTo(Product);
Product.hasMany(Comment, { as: "comments" });
Client.hasMany(Comment, { as: "comments" });

//*Relaciones entre el modelo Service y Profesional
Service.belongsTo(Profesional);
Profesional.hasMany(Service);

//*Relaciones entre modelo Clients y modelo Products a través de Favorites
Client.belongsToMany(Product, { through: "Favorites" });
Product.belongsToMany(Client, { through: "Favorites" });


//* Relaciones entre Appoinments y Service/ Profesional y Client: un profesional puede tener muchas citas, un cliente puede tener muchas citas y un servicio puede tener muchas citas. A su vez, cada cita pertenece a un profesional, un cliente y un servicio específico.
Profesional.hasMany(Appointment);
Client.hasMany(Appointment);
Service.hasMany(Appointment);
Appointment.belongsTo(Profesional);
Appointment.belongsTo(Client);
Appointment.belongsTo(Service);

//*Relaciones entre ShopsDetails-Products
ShopsDetail.belongsTo(Product);
Product.hasMany(ShopsDetail);

//*Relaciones entre Shops y ShopsDetails
ShopsDetail.belongsTo(Shop);
Shop.hasMany(ShopsDetail);

//*Relaciones entre Shops y Clients
Shop.belongsTo(Client);
Client.hasMany(Shop);


module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
