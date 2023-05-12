const router = require("express").Router();
const getCategories = require("../controllers/Categories/getCategories");
const postCategory = require("../controllers/Categories/postCategory");
const postCategoryValidation = require("../validations/postCategory");
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

router.put("/:id");

router.delete("*:id");

module.exports = router;
