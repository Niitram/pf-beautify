const postServiceComment = require("../controllers/Comments/postServiceComment");
const comments = require("./servicesComments.json");

const bulkCreateServicesComments = async () => {
  try {
    for (const comment of comments) {
      const { content, tittle, rating, serviceId, clientId } = comment;
      await postServiceComment(serviceId, clientId, {
        content,
        tittle,
        rating,
      });
    }
    console.log("Comentarios de servicios añadidos a la base de datos");
  } catch (error) {
    console.log(
      "No se han podido cargar los comentarios de productos a la base de datos"
    );
  }
};

module.exports = bulkCreateServicesComments;
