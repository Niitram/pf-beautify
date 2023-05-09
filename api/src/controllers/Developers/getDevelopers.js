const { Developer } = require("../../db");

const getDevelopers = async () => {
  const developers = Developer.findAll();
  return developers;
};

module.exports = getDevelopers;
