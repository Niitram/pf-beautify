const router = require("express").Router();
const getServices = require("../controllers/Services/getServices");
const postService = require("../controllers/Services/postService");
router.get("/", async (req, res) => {
  try {
    const service = await getServices();
    res.json(service);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, description, image, rate } = req.body;
    const createService = await postService(
      name,
      price,
      description,
      image,
      rate
    );
    res.json(createService);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
