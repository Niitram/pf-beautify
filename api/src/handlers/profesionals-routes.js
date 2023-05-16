const router = require("express").Router();
const getProfesionals = require("../controllers/Profesionals/getProfesionals");
const getProfesionalDetail = require("../controllers/Profesionals/getProfesionalDetail");
const postProfesional = require("../controllers/Profesionals/postProfesional");
const putProfesional = require("../controllers/Profesionals/putProfesional");
const {
  profesionalGetValidation,
  profesionalGetIdValidation,
  profesionalPostValidation,
  profesionalPutValidation,
} = require("../validations/professionalsValidation");

router.get("/", profesionalGetValidation, async (req, res) => {
  try {
    const response = await getProfesionals();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", profesionalGetIdValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getProfesionalDetail(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/", profesionalPostValidation,  async (req, res) => {
  try {
    const { fullname, mail, direction, image } = req.body;
    const response = await postProfesional(fullname, mail, direction, image);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", profesionalPutValidation, async (req, res) => {
  try {
    const { fullname, mail, direction, image } = req.body;
    const { id } = req.params;
    const response = await putProfesional(id, fullname, mail, direction, image);
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
