const { Op } = require("sequelize");
const { Developer } = require("../db");

const postDevelopersValidation = async (req, res, next) => {
  const { fullName, description, image, linkedin } = req.body;

  //*checking there's no missing data
  if (![fullName, description, image, linkedin].every(Boolean))
    return res.status(400).json({ error: "Incomplete Data" });

  //* checking all vars come as strings
  if (
    ![fullName, description, image, linkedin].every(
      (data) => typeof data === "string"
    )
  )
    return res.status(400).json({ error: "Data must come in strings" });

  //* checking none string is larger than 255 characters
  if (
    ![fullName, description, image, linkedin].every(
      (data) => data.length <= 255
    )
  )
    return res.status(400).json({
      error: "Data must come in strings no larger than 255 characters",
    });

  //* checking linkedin is an url
  const urlRegex = /^(https?|ftp):\/\/([^\s/$.?#].[^\s]*)\.com$/i;
  if (!linkedin.match(urlRegex))
    return res.status(400).json({ error: "linkedin link must be an url" });

  //*checking there's not another developer with the same name
  let oldDeveloper = await Developer.findOne({
    where: { fullName: { [Op.iLike]: fullName } },
  });
  if (oldDeveloper)
    return res.status(400).json({ error: "Developer alredy exists" });

  //*checking there's not another developer with the same linkedin
  oldDeveloper = await Developer.findOne({
    where: { linkedin: { [Op.iLike]: linkedin } },
  });
  if (oldDeveloper)
    return res.status(400).json({ error: "Developer alredy exists" });

  next();
};

module.exports = postDevelopersValidation;
