const { Developer } = require("../../db");

const postDeveloper = async (developerInfo) => {
  developerInfo.fullName =
    developerInfo.fullName[0].toUpperCase() + developerInfo.fullName.slice(1);
  const newDeveloper = await Developer.create(developerInfo);
  return newDeveloper;
};

module.exports = postDeveloper;
