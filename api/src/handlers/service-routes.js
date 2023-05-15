const router = require("express").Router();
const getServices = require("../controllers/Services/getServices");
const postService = require("../controllers/Services/postService");
const deleteService = require("../controllers/Services/deleteService");
const putService = require("../controllers/Services/putService");
const {
  validatePostService,
  validateServiceExistence,
  validateServiceUpdate,
  validateDeleteService,
} = require("../validations/ValidationService");
router.get("/", validateServiceExistence, async (req, res) => {
  try {
    const service = await getServices();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", validatePostService, async (req, res) => {
  try {
    const { name, price, description, image, rate } = req.body;
    const createService = await postService(
      name,
      price,
      description,
      image,
      rate
    );
    res.status(201).json(createService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", validateServiceUpdate, async (req, res) => {
  try {
    const { id } = req.params;
    const toModify = req.body;
    const response = await putService(id, toModify);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", validateDeleteService, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteService(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
