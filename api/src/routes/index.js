const { Router } = require('express');
const categoriesRoutes = require('../handlers/categories-routes')
const servicesRoutes = require('../handlers/service-routes')
const router = Router();

 router.use('/categories', categoriesRoutes)
 router.use('/service', servicesRoutes);
 router.get("/holis", (req, res) => {
    try {
        res.status(200).send("tukis")
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}) 

module.exports = router;