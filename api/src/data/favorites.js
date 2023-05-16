const postFavorite = require("../controllers/Favorites/postFavorite");
const { Client } = require("../db");

const favorites = [
  { clientId: 1, productId: 1 },
  { clientId: 1, productId: 3 },
  { clientId: 1, productId: 2 },
  { clientId: 1, productId: 6 },
  { clientId: 2, productId: 1 },
  { clientId: 2, productId: 3 },
  { clientId: 2, productId: 5 },
  { clientId: 3, productId: 6 },
  { clientId: 3, productId: 1 },
  { clientId: 3, productId: 2 },
  { clientId: 3, productId: 3 },
  { clientId: 4, productId: 1 },
  { clientId: 4, productId: 10 },
  { clientId: 4, productId: 8 },
  { clientId: 5, productId: 9 },
  { clientId: 5, productId: 2 },
  { clientId: 5, productId: 1 },
  { clientId: 6, productId: 7 },
  { clientId: 6, productId: 1 },
  { clientId: 6, productId: 2 },
];

const bulckCreateFavorites = async () => {
  try {
    const promises = favorites.map(async ({ clientId, productId }) => {
      await postFavorite(clientId, productId);
    });

    Promise.all(promises);
    console.log("Los favoritos se han cargado a la base de datos");
  } catch (error) {
    console.log("no se pudieron cargar los favoritos a la base de datos");
    console.log(error.message);
  }
};

module.exports = bulckCreateFavorites;
