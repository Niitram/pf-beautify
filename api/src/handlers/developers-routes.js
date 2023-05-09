const { Router } = require("express");
const getDevelopers = require("../controllers/getDevelopers");
const postDeveloper = require("../controllers/postDeveloper");

const developersRouter = Router();

developersRouter.get("/", async (req, res) => {
  try {
    const developers = await getDevelopers();
    res.status(200).json(developers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//*validaciones!
developersRouter.post("/", async (req, res) => {
  try {
    const developerInfo = req.body;
    const newDeveloper = await postDeveloper(developerInfo);
    res.status(200).json(newDeveloper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = developersRouter;
