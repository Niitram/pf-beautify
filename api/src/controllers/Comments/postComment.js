const { Comment, Product } = require("../../db");

const postComment = async (content, tittle, rating, productId, clientId) => {
  const newComment = await Comment.create({ content, tittle, rating });
  await newComment.setClient(clientId);
  await newComment.setProduct(productId);

  const oldProduct = await Product.findByPk(productId);
  const oldRates = oldProduct.arrayRates;
  await oldProduct.update({ arrayRates: [...oldRates, rating] });

  return newComment;
};

module.exports = postComment;
