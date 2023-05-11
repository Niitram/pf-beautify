const { Router } = require("express");
const categoriesRoutes = require("../handlers/categories-routes");
const servicesRoutes = require("../handlers/service-routes");
const productsRouter = require("../handlers/products-routes");
const usersRouter = require("../handlers/client-routes");
const developersRouter = require("../handlers/developers-routes");
const profesionalsRouter = require('../handlers/profesionals-routes');
const commentsRouter = require('../handlers/comments-routes');
const appointmentsRouter = require('../handlers/appointments-routes');
const shopsRouter = require("../handlers/shops-routes");
const router = Router();


router.use('/comments', commentsRouter)
router.use('/profesionals', profesionalsRouter)
router.use('/client', usersRouter)
router.use('/categories', categoriesRoutes)
router.use('/services', servicesRoutes);
router.use("/products", productsRouter);
router.use("/developers", developersRouter);
router.use('/appointments',appointmentsRouter);
router.use("/shops", shopsRouter);



module.exports = router;
