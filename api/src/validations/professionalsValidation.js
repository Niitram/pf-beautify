const { Professional } = require("../db");

const professionalGetValidation = async (req, res, next) => {
  try {
    const Professionals = await Professional.findAll();
    if (!Professionals.length) throw new Error("No Professionals found");
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const professionalGetIdValidation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ProfessionalDetail = await Professional.findByPk(id);
    if (!ProfessionalDetail) throw new Error("No Professional found");
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const professionalPostValidation = async (req, res, next) => {
  try {
    const { fullname, mail, direction, image } = req.body;
    if (!mail) throw new Error("Must include mail to create");
    if (!fullname) throw new Error("Must include full name to create");
    if (!direction) throw new Error("Must include direction to create");
    if (!image) throw new Error("Must include image to create");
    const DBCheck = await Professional.findOne({ where: { mail } });
    if (DBCheck) throw new Error("Professional already exist");
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const professionalPutValidation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullname, mail, direction, image } = req.body;
    const checkProfessional = await Professional.findByPk(id);
    if (fullname && fullname === checkProfessional.fullname)
      throw new Error(`Name value alredy set to ${fullname}`);
    if (mail && mail === checkProfessional.mail)
      throw new Error(`Mail value alredy set to ${mail}`);
    if (direction && direction === checkProfessional.direction)
      throw new Error(`Direction value alredy set to ${direction}`);
    if (image && image === checkProfessional.image)
      throw new Error(`Image value alredy set to ${image}`);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  professionalGetValidation,
  professionalGetIdValidation,
  professionalPostValidation,
  professionalPutValidation,
};
