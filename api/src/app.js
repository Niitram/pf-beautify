const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const productsRoutes= require("./routes/products.routes.js")
// const clientsRoutes= require("./routes/clients.routes.js")
// const adminRoutes= require("./routes/admin.routes.js")
// const commentRoutes= require("./routes/comment.routes.js")
// const serviceRoutes= require("./routes/service.routes.js")
// const profesionalRoutes= require("./routes/profesional.routes.js")
// const favoriteRoutes= require("./routes/favorites.routes.js")
// const categoriesRoutes= require("./routes/categories.routes.js")


require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//* aqui se agregan las rutas 
server.use("/",productsRoutes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;