const { Service } = require("../db");

const validatePostService = (req, res, next) => {
  try {
    const { name, price, description, image, rate } = req.body;
    if (!name) throw new Error("Require service name to create");
    if (!price) throw new Error("Require a price to create");
    if (!description) throw new Error("Require description to create");
    if (!image) throw new Error("Require image to create");
    if (!rate) throw new Error("Require rate to create");
    next();
  } catch (error) {
    res.status(406).json({ error: error.message });
  }
};

const validateServiceExistence = async (req, res, next) => {
  try {
    const services = await Service.findAll();
    if (!services.length) throw new Error("No services found");
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const validateServiceUpdate = async (req, res, next) => {
  try {
    const toModify = req.body;
    const { id } = req.params;
    const checkService = await Service.findByPk(id);
    if (!checkService) throw new Error('Service not found')
    if (
      !toModify.name &&
      !toModify.price &&
      !toModify.description &&
      !toModify.rate &&
      !toModify.image
    )
    throw new Error("Error in modify values");
    else next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const validateDeleteService = async (req, res, next) => {
    try {
    const {id} = req.params;
    const serviceToDel = await Service.findByPk(id)
    if(!serviceToDel) throw new Error('Service not found')
    next()
    } catch (error) {
    res.status(404).json({error: error.message})
    }

}
module.exports = {
  validatePostService,
  validateServiceExistence,
  validateServiceUpdate,
  validateDeleteService
};
