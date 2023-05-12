const { Profesional } = require("../../db");

const postProfesional = async (fullname, mail, direction, image) => {
  fullname = fullname[0].toUpperCase() + fullname.slice(1);
  const newProfesional = await Profesional.create({
    fullname,
    mail,
    direction,
    image,
  });
  return newProfesional;
};

module.exports = postProfesional;
