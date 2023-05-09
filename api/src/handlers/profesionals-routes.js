const router = require("express").Router();
const getProfesionals = require("../controllers/Profesionals/getProfesionals");
const getProfesionalDetail = require("../controllers/Profesionals/getProfesionalDetail");
const postProfesional = require("../controllers/Profesionals/postProfesional");
const putProfesional = require('../controllers/Profesionals/putProfesional')

router.get("/", async (req, res) => {
  try {
    const response = await getProfesionals();
    res.json(response);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const response = await getProfesionalDetail(id);
    res.json(response);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { fullName, mail, direction, image } = req.body;
    const response = await postProfesional(fullName, mail, direction, image);
    res.json(response);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
    try {
        const {fullName, mail, direction, image} = req.body
        const {id} = req.params
        await putProfesional(id, fullName, mail, direction, image)
        res.send('successfully modified')
    } catch (error) {
        res.json({error: error.message})
    }
})

module.exports = router;
