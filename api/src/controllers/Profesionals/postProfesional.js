const { Profesional } = require("../../db");

const postProfesional = async (fullname, mail, direction, image) => {
  const DBCheck = await Profesional.findOne({ where: { mail } });
  if (DBCheck) {
    throw new Error("Profesional already exist");
  }
  const newProfesional = await Profesional.create({
    fullname,
    mail,
    direction,
    image,
  });
  return newProfesional;
};

module.exports = postProfesional;
