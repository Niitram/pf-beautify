const router = require("express").Router();
const postClient = require("../controllers/Clients/postClient");
const putClientInfo = require('../controllers/Clients/putClientInfo')
const {validationSaveClient, validationPutClient}= require('../validations/validationClient')

router.post("/", validationSaveClient, async (req, res) => {
  try {
    const { password, email, fullName } = req.body;
    const client = await postClient(password, email, fullName);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', validationPutClient, async (req,res) => {
    try {
      const {adress, phone} = req.body
      const {id} = req.params
      const modifyConfirmation = await putClientInfo(id, adress, phone)
      res.json(modifyConfirmation)
    } catch (error) {
      res.status(500).json({error: error.message});
    }
})

module.exports = router;
