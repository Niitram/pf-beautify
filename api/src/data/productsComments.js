const postComment = require("../controllers/Comments/postComment");
const comments = require("./productsComments.json");

const bulkCreateProductsComments = async () => {
  try {
    for (const comment of comments) {
      const { content, tittle, rating, productId, clientId } = comment;
      await postComment(content, tittle, rating, productId, clientId);
    }
    console.log("Comentarios de productos añadidos a la base de datos");
  } catch (error) {
    console.log(
      "No se han podido cargar los comentarios de productos a la base de datos",
      error.message
    );
  }
};

module.exports = bulkCreateProductsComments;
