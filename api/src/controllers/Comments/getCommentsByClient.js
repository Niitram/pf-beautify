const { Comment, Client } = require("../../db.js");

const getCommentsByClient = async (clientId) => {
  const comments = await Comment.findAll({ where: { ClientId: clientId } });
  return comments;
};

module.exports = getCommentsByClient;
