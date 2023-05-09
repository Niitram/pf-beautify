const { Developer } = require("../../db");

const postDeveloper = async (developerInfo) => {
  const newDeveloper = await Developer.create(developerInfo);
  return newDeveloper;
};

module.exports = postDeveloper;
