const { Profesional, Service } = require("../db");

const profesionalGetValidation = async (req, res, next) => {
  try {
    const Profesionals = await Profesional.findAll();
    if (!Profesionals.length) throw new Error("No Profesionals found");
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const profesionalGetIdValidation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ProfesionalDetail = await Profesional.findByPk(id);
    if (!ProfesionalDetail) throw new Error("No Profesional found");
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const profesionalPostValidation = async (req, res, next) => {
  try {
    const { fullname, mail, direction, image, service } = req.body;
    if (!mail) throw new Error("Must include mail to create");
    const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;
    if (!mail.match(regex))
      throw new Error("Unable to save professional in database, invalid email");
    if (!fullname) throw new Error("Must include full name to create");
    if (!direction) throw new Error("Must include direction to create");
    if (!image) throw new Error("Must include image to create");
    const DBCheck = await Profesional.findOne({ where: { mail } });
    if (DBCheck) throw new Error("Profesional already exist");
    const DBCheckService = await Service.findOne({
      where: { name: service.name },
    });
    if (DBCheckService) throw new Error("Service alredy exists");
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const profesionalPutValidation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullname, mail, direction, image } = req.body;
    const checkProfesional = await Profesional.findByPk(id);
    if (fullname && fullname === checkProfesional.fullname)
      throw new Error(`Name value alredy set to ${fullname}`);
    if (mail && mail === checkProfesional.mail)
      throw new Error(`Mail value alredy set to ${mail}`);
    if (direction && direction === checkProfesional.direction)
      throw new Error(`Direction value alredy set to ${direction}`);
    if (image && image === checkProfesional.image)
      throw new Error(`Image value alredy set to ${image}`);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  profesionalGetValidation,
  profesionalGetIdValidation,
  profesionalPostValidation,
  profesionalPutValidation,
};
