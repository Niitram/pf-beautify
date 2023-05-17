const { Router } = require("express");
const postFavorite = require("../controllers/Favorites/postFavorite");
const postFavoritesValidation = require("../validations/postFavorite");
const deleteFavorite = require("../controllers/Favorites/deleteFavorite");
const deleteFavoritesValidation = require("../validations/deleteFavorite");
const getFavoritesByClientId = require("../controllers/Favorites/getFavoritesByClientId");

const favoritesRouter = Router();

favoritesRouter.get("/:clientId", async (req, res) => {
  const { clientId } = req.params;
  try {
    const favorites = await getFavoritesByClientId(clientId);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

favoritesRouter.post("/", postFavoritesValidation, async (req, res) => {
  try {
    const { clientId, productId } = req.body;
    const newFavorite = await postFavorite(clientId, productId);
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

favoritesRouter.delete("/", deleteFavoritesValidation, async (req, res) => {
  try {
    const { clientId, productId } = req.body;
    const oldFavorite = await deleteFavorite(productId, clientId);
    res.status(200).json(oldFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = favoritesRouter;
