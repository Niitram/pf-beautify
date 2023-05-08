const { Router } = require("express");
const productsRouter = require("../handlers/products-routes");
// const authRoutes = require("../handlers/auth-routes");

const router = Router();

// router.use("/auth", authRoutes);
router.get("/holis", (req, res) => {
  try {
    res.status(200).send("tukis");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// router.use("/auth", authRoutes);
router.use("/products", productsRouter);

router.get("/holis", (req, res) => {
  try {
    res.status(200).send("tukis");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
