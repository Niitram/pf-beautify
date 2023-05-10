const router = require("express").Router();
const getCategories = require("../controllers/Categories/getCategories");
const  validateCategoriesExistence = require('../validations/validationCategories')
router.get("/", validateCategoriesExistence, async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
