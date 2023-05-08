const { Router } = require("express");
const getProducts = require("../controllers/getProducts");
const postProduct = require("../controllers/postProduct");

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const product = await getProducts(name);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//*falta validación!!!
productsRouter.post("/", async (req, res) => {
  try {
    const product = req.body;
    const createdProduct = await postProduct(product);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// productsRouter.put("/:id",updateProducts);
// productsRouter.delete("/:id",deleteProducts);
// productsRouter.get("/:id",getProductById);
// productsRouter.patch("/:id", updateProductValues);

module.exports = productsRouter;
