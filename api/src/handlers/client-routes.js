const router = require("express").Router();
const postClient = require("../controllers/Clients/postClient");
const putClientInfo = require('../controllers/Clients/putClientInfo')
const getClients = require("../controllers/Clients/getClients")
const getClientById = require("../controllers/Clients/getClientById")
const {validationSaveClient, validationPutClient, validateClientExistence}= require('../validations/validationClient')


router.get('/', async (req,res) => {
  try {
    const response = await getClients()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

router.get('/:id', validateClientExistence, async (req, res) => {
  try {
    const {id} = req.params
    const response = await getClientById(id);
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

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
      const toModify = req.body
      const {id} = req.params
      const modifyConfirmation = await putClientInfo(id, toModify)
      res.json(modifyConfirmation)
    } catch (error) {
      res.status(500).json({error: error.message});
    }
})

module.exports = router;
