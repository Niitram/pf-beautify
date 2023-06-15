const { Client, Product, Comment, Service } = require("../db");

const validationPostComment = async (req, res, next) => {
  try {
    const { productId, clientId } = req.params;
    const { tittle, content, rating } = req.body;

    const ids = [Number(productId), Number(clientId)];
    if (!ids.every(Boolean)) throw new Error("Product and Client ids required");
    if (!ids.every((id) => Math.floor(id) === id))
      throw new Error("Product and Client ids must be integers");

    if (typeof rating !== "number" || rating < 0 || rating > 5)
      throw new Error("Rating must be a number between 0 and 5");

    const strings = [tittle, content];
    if (
      !strings.every(
        (string) =>
          typeof string === "string" && string.length > 0 && string.length < 255
      )
    )
      throw new Error(
        "Tittle and content must be string with length between 1 and 255 characters"
      );

    const validateProduct = await Product.findByPk(productId);
    const validateClient = await Client.findByPk(clientId);

    if (!validateProduct || !validateClient)
      throw new Error("Product or client not found");

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validationPostServiceComment = async (req, res, next) => {
  try {
    const { serviceId, clientId } = req.params;
    const { tittle, content, rating } = req.body;

    const ids = [Number(serviceId), Number(clientId)];
    if (!ids.every(Boolean)) throw new Error("Product and Client ids required");
    if (!ids.every((id) => Math.floor(id) === id))
      throw new Error("Product and Client ids must be integers");

    if (typeof rating !== "number" || rating < 0 || rating > 5)
      throw new Error("Rating must be a number between 0 and 5");

    const strings = [tittle, content];
    if (
      !strings.every(
        (string) =>
          typeof string === "string" && string.length > 0 && string.length < 255
      )
    )
      throw new Error(
        "Tittle and content must be string with length between 1 and 255 characters"
      );

    const validateService = await Service.findByPk(serviceId);
    const validateClient = await Client.findByPk(clientId);

    if (!validateService || !validateClient)
      throw new Error("Service or client not found");

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validationGetProductComments = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!productId || Math.floor(productId) !== productId)
      throw new Error("ProductId must be an integer number");

    const validateProduct = await Product.findByPk(productId);
    if (!validateProduct) throw new Error("Product not found");
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateCommentModification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exist = await Comment.findByPk(id);
    if (exist) next();
    else throw new Error("Comment do not exist");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  validationPostComment,
  validateCommentModification,
  validationGetProductComments,
  validationPostServiceComment,
};
