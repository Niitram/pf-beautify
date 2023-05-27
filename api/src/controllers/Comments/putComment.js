const { Comment } = require("../../db");

const putComment = async (id, content, tittle, rating) => {
  const modifyComment = await Comment.findByPk(id);
  modifyComment.set({ content, tittle, rating });
  return modifyComment;
};

module.exports = putComment;
