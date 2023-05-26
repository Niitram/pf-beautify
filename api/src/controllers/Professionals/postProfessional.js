const { Professional } = require("../../db");

const postProfessional = async (fullname, mail, direction, image) => {
  fullname = fullname[0].toUpperCase() + fullname.slice(1);
  const newProfessional = await Professional.create({
    fullname,
    mail,
    direction,
    image,
  });
  return newProfessional;
};

module.exports = postProfessional;
