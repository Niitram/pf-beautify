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
  Professional,
  Service,
  ShopsDetail,
  Shop,
  Appointment,
  Purchase,
  SavedCart,
  ServicesReview,
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
Service.belongsTo(Professional);
Professional.hasMany(Service);
Comment.belongsTo(Service);
Service.hasMany(Comment);

//*Relaciones entre modelo Clients y modelo Products a través de Favorites
Client.belongsToMany(Product, { through: "Favorites" });
Product.belongsToMany(Client, { through: "Favorites" });

//* Relaciones entre Appoinments y Service/ Profesional y Client: un profesional puede tener muchas citas, un cliente puede tener muchas citas y un servicio puede tener muchas citas. A su vez, cada cita pertenece a un profesional, un cliente y un servicio específico.
Professional.hasMany(Appointment);
Client.hasMany(Appointment);
Service.hasMany(Appointment);
Appointment.belongsTo(Professional);
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

//*Relaciones entre SavedCarts, Clients y Products
Client.hasOne(SavedCart);
SavedCart.belongsTo(Client);

SavedCart.belongsToMany(Product, { through: "CartsProducts" });
Product.belongsToMany(SavedCart, { through: "CartsProducts" });

//*Relaciones entre ServicesReviews, Clients, Services y Professionals
ServicesReview.belongsTo(Client);
Client.hasMany(ServicesReview);

ServicesReview.belongsTo(Service);
Service.hasMany(ServicesReview);

ServicesReview.belongsTo(Professional);
Professional.hasMany(ServicesReview);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
