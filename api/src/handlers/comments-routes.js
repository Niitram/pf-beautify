const router = require("express").Router();
const postComment = require("../controllers/Comments/postComment");
const {
  validationPostComment,
  validateCommentModification,
  validationGetProductComments,
  validationPostServiceComment,
} = require("../validations/validationComment");
const getCommentsByProductId = require("../controllers/Comments/getCommentsByProductId");
const putComment = require("../controllers/Comments/putComment");
const deleteComment = require("../controllers/Comments/deleteComment");
const postServiceComment = require("../controllers/Comments/postServiceComment");

router.post(
  "/products/:productId/:clientId",
  validationPostComment,
  async (req, res) => {
    try {
      const { productId, clientId } = req.params;
      const { content, tittle, rating } = req.body;
      const response = await postComment(
        content,
        tittle,
        rating,
        productId,
        clientId
      );
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/services/:serviceId/:clientId",
  validationPostServiceComment,
  async (req, res) => {
    try {
      const { serviceId, clientId } = req.params;
      const comment = req.body;
      const response = await postServiceComment(serviceId, clientId, comment);
      res.json(response);
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);

router.get(
  "/products/:productId",
  validationGetProductComments,
  async (req, res) => {
    try {
      const productId = Number(req.params.productId);
      const comments = await getCommentsByProductId(productId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.put("/:id", validateCommentModification, async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;
    const modified = await putComment(id, content);
    res.status(200).json(modified);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", validateCommentModification, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteComment(id);
    res.status(200).send(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
