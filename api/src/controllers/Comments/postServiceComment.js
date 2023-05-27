const { Service, Comment, Client } = require("../../db");

const postServiceComment = async (
  serviceId,
  clientId,
  { tittle, content, rating }
) => {
  const newComment = await Comment.create({
    tittle,
    content,
    rating,
  });
  await newComment.setClient(clientId);
  await newComment.setService(serviceId);

  const oldService = await Service.findByPk(serviceId);
  const oldRates = oldService.arrayRates;
  await oldService.update({ arrayRates: [...oldRates, rating] });

  return newComment;
};

module.exports = postServiceComment;
