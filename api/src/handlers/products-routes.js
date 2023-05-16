const { Router } = require("express");
const getProducts = require("../controllers/Products/getProducts");
const postProduct = require("../controllers/Products/postProduct");
const getProductById = require("../controllers/Products/getProductById");
const postProductsValidation = require("../validations/postProducts");
const addRate = require("../controllers/Products/addRate");
const productAddRate = require("../validations/productAddRate");
const updateProduct = require("../controllers/Products/updateProduct");
const updateProductValidation = require("../validations/updateProduct");
const addStock = require("../controllers/Products/addStock");
const productAddStock = require("../validations/productAddStock");

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

productsRouter.put("/addRate/:productId", productAddRate, async (req, res) => {
  try {
    const productId = Number(req.params.productId);
    const rate = Number(req.body.rate);

    const newProduct = await addRate(productId, rate);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

productsRouter.put(
  "/addStock/:productId",
  productAddStock,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { load } = req.body;
      const updatedProduct = await addStock(productId, load);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

productsRouter.put("/:id", updateProductValidation, async (req, res) => {
  try {
    const propertys = req.body;
    const id = Number(req.params.id);
    const updatedProduct = await updateProduct(id, propertys);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//* no hay una ruta de delete porque se usa borrado lógico =)

module.exports = productsRouter;
