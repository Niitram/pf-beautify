const router = require("express").Router();
const getProfessionals = require("../controllers/Professionals/getProfessionals");
const getProfessionalDetail = require("../controllers/Professionals/getProfessionalDetail");
const postProfessional = require("../controllers/Professionals/postProfessional");
const putProfessional = require("../controllers/Professionals/putProfessional");
const {
  professionalGetValidation,
  professionalGetIdValidation,
  professionalPostValidation,
  professionalPutValidation,
} = require("../validations/professionalsValidation");

router.get("/", professionalGetValidation, async (req, res) => {
  try {
    const response = await getProfessionals();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", professionalGetIdValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getProfessionalDetail(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/", professionalPostValidation, async (req, res) => {
  try {
    const { fullname, mail, direction, image } = req.body;
    const response = await postProfessional(fullname, mail, direction, image);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", professionalPutValidation, async (req, res) => {
  try {
    const { fullname, mail, direction, image } = req.body;
    const { id } = req.params;
    const response = await putProfessional(
      id,
      fullname,
      mail,
      direction,
      image
    );
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
