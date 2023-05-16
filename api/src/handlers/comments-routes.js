const router = require("express").Router();
const postComment = require("../controllers/Comments/postComment");
const {validationComment, validateCommentModification} = require('../validations/validationComment')
const getCommentsByProductId = require('../controllers/Comments/getCommentsByProductId')
const putComment = require('../controllers/Comments/putComment')
const deleteComment = require('../controllers/Comments/deleteComment');
router.post("/:productId/:clientId", validationComment, async (req, res) => {
  try {
    const {productId, clientId} = req.params
    const {content} = req.body;
    const response = await postComment(content, productId, clientId);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const productId=Number(req.params.productId);
    const comments= await getCommentsByProductId(productId)
    res.status(200).json(comments)
    
  } catch (error) {
    res.status(500).json({error:error.message})
  }
    
});

router.put("/:id", validateCommentModification, async (req, res) => {
    try {
        const {content} = req.body;
        const {id} = req.params
        const modified = await putComment(id, content)
        res.status(200).json(modified)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

router.delete('/:id', validateCommentModification, async (req,res) => {
    try {
        const {id} = req.params
        const deleted = await deleteComment(id)
        res.status(200).send(deleted)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;
