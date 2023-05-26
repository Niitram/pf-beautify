const { Professional } = require("../../db");

const putProfessional = async (id, fullname, mail, direction, image) => {
  const modifyProfessional = await Professional.findByPk(id);
  if (fullname) fullname = fullname[0].toUpperCase() + fullname.slice(1);
  if (fullname) await modifyProfessional.update({ fullname });
  if (mail) await modifyProfessional.update({ mail });
  if (direction) await modifyProfessional.update({ direction });
  if (image) await modifyProfessional.update({ image });
  return modifyProfessional;
};

module.exports = putProfessional;
