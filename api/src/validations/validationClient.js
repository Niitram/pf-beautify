const { Client } = require("../db");

const validationSaveClient = async (req, res, next) => {
  try {
    const { email, fullName } = req.body;
    if (!email)
      throw new Error(`Unable to save user in database, no email provided`);
    const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;
    if (!email.match(regex))
      throw new Error("Unable to save user in database, invalid email");
    if (!fullName)
      throw new Error(`Unable to save user in database, not name provided`);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validationPutClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adress, phone } = req.body;
    const toModify = await Client.findByPk(id);
    if (!toModify) throw new Error(`No client found with id:  ${id}`);
    if (adress && adress === toModify.adress)
      throw new Error(`Adress value alredy set to ${adress}`);
    if (phone && phone === toModify.phone)
      throw new Error(`Phone value alredy set to ${phone}`);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateClientExistence = async (req, res, next) => {
  try {
    const { email } = req.params;
    const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;
    if (!email.match(regex)) throw new Error("InvalidEmail");
    const client = await Client.findOne({ where: { email } });
    if (!client) throw new Error("Client not found");
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const validateFindOrCreate = async (req, res, next) => {
  try {
    const { email, fullName } = req.body;
    if (!email) throw new Error("EmailRequired");
    const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;
    if (!email.match(regex)) throw new Error("InvalidEmail");
    if (email.length > 255) throw new Error("InvalidEmail");

    if (fullName) {
      if (fullName.length > 255) throw new Error("Name's too long");
      const client = await Client.findOne({ where: { email } });
      if (client && client.fullName !== fullName)
        throw new Error("Incorrect name");
    }
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  validationSaveClient,
  validationPutClient,
  validateClientExistence,
  validateFindOrCreate,
};
