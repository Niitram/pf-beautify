const { Router } = require("express");
const getProducts = require("../controllers/Products/getProducts");
const postProduct = require("../controllers/Products/postProduct");
const getProductById = require("../controllers/Products/getProductById");
const postProductsValidation = require("../validations/postProducts");

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

productsRouter.post("/", postProductsValidation, async (req, res) => {
  try {
    const product = req.body;
    const createdProduct = await postProduct(product);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    //chequea que la id sea un número
    if (String(id) === "NaN")
      return res.status(400).json({ error: "Incorrect data" });

    const product = await getProductById(id);
    if (!product) return res.status(400).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// productsRouter.put("/:id",updateProducts);
// productsRouter.delete("/:id",deleteProducts);
// productsRouter.patch("/:id", updateProductValues);

module.exports = productsRouter;
