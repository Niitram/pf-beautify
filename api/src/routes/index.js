const { Router } = require("express");
const categoriesRoutes = require("../handlers/categories-routes");
const servicesRoutes = require("../handlers/service-routes");
const productsRouter = require("../handlers/products-routes");
const usersRouter = require("../handlers/client-routes");
const developersRouter = require("../handlers/developers-routes");
<<<<<<< HEAD
const profesionalsRouter = require('../handlers/profesionals-routes');
const commentsRouter = require('../handlers/comments-routes');
const appointmentsRouter = require('../handlers/appointments-routes');


const router = Router();


router.use('/comments', commentsRouter)
router.use('/profesionals', profesionalsRouter)
router.use('/client', usersRouter)
router.use('/categories', categoriesRoutes)
router.use('/services', servicesRoutes);
router.use("/products", productsRouter);
router.use("/developers", developersRouter);
router.use('/appointments',appointmentsRouter);
=======
const profesionalsRouter = require("../handlers/profesionals-routes");
const commentsRouter = require("../handlers/comments-routes");
const shopsRouter = require("../handlers/shops-routes");
const favoritesRouter = require("../handlers/favorites-routes");
const router = Router();

router.use("/comments", commentsRouter);
router.use("/profesionals", profesionalsRouter);
router.use("/client", usersRouter);
router.use("/categories", categoriesRoutes);
router.use("/services", servicesRoutes);
router.use("/products", productsRouter);
router.use("/developers", developersRouter);
router.use("/shops", shopsRouter);
router.use("/favorites", favoritesRouter);
>>>>>>> 44d0cb2ba1cbd8de19ed042aae7e078772f0e7e5


module.exports = router;
