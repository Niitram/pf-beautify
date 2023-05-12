const router = require("express").Router();
const deleteCategory = require("../controllers/Categories/deleteCategory");
const getCategories = require("../controllers/Categories/getCategories");
const postCategory = require("../controllers/Categories/postCategory");
const putCategory = require("../controllers/Categories/putCategory");
const deleteCategoryValidation = require("../validations/deleteCategory");
const postCategoryValidation = require("../validations/postCategory");
const putCategoryValidation = require("../validations/putCategory");
const validateCategoriesExistence = require("../validations/validationCategories");

router.get("/", validateCategoriesExistence, async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", postCategoryValidation, async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await postCategory(name);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", putCategoryValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await putCategory(id, name);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", deleteCategoryValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await deleteCategory(id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
