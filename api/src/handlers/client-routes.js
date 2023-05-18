const router = require("express").Router();
const postClient = require("../controllers/Clients/postClient");

const putClientInfo = require("../controllers/Clients/putClientInfo");
const getClients = require("../controllers/Clients/getClients");
const getClientByEmail = require("../controllers/Clients/getClientByEmail");
const {
  validationSaveClient,
  validationPutClient,
  validateClientExistence,
  validateFindOrCreate,
} = require("../validations/validationClient");
const findOrCreateClient = require("../controllers/Clients/findOrCreateClient");

router.get("/", async (req, res) => {
  try {
    const response = await getClients();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:email", validateClientExistence, async (req, res) => {
  try {
    const { email } = req.params;

    const response = await getClientByEmail(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", validationSaveClient, async (req, res) => {
  try {
    const { password, email, fullName } = req.body;
    const client = await postClient(password, email, fullName);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", validationPutClient, async (req, res) => {
  try {
    const toModify = req.body;
    const { id } = req.params;
    const modifyConfirmation = await putClientInfo(id, toModify);
    res.json(modifyConfirmation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/findOrCreate", validateFindOrCreate, async (req, res) => {
  try {
    const { email, fullName } = req.body;
    const [client, created] = await findOrCreateClient(email, fullName);
    res.status(200).json({ client, created });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
