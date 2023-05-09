const { Router } = require('express');
const categoriesRoutes = require('../handlers/categories-routes')
const servicesRoutes = require('../handlers/service-routes')
const productsRouter = require("../handlers/products-routes");
const usersRouter = require('../handlers/client-routes')
const router = Router();



router.use('/client', usersRouter)
 router.use('/categories', categoriesRoutes)
 router.use('/services', servicesRoutes);
router.use("/products", productsRouter);

router.get("/holis", (req, res) => {
  try {
    res.status(200).send("tukis");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
