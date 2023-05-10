const { Profesional } = require("../../db");

const postProfesional = async (fullname, mail, direction, image) => {
  const newProfesional = await Profesional.create({
    fullname,
    mail,
    direction,
    image,
  });
  return newProfesional;
};

module.exports = postProfesional;
