const { Router } = require("express");
const postSavedCart = require("../controllers/SavedCarts/postSavedCart");
const getSavedCartByClientId = require("../controllers/SavedCarts/getSavedCartByClientId");
const {
  getCartValidation,
  postCartValidation,
} = require("../validations/savedCarts");

const savedCartsRouter = Router();

savedCartsRouter.post("/:clientId", postCartValidation, async (req, res) => {
  try {
    const { clientId } = req.params;
    const { products } = req.body;
    const newCart = await postSavedCart(clientId, products);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

savedCartsRouter.get("/:clientId", getCartValidation, async (req, res) => {
  try {
    const { clientId } = req.params;
    const cart = await getSavedCartByClientId(clientId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = savedCartsRouter;
