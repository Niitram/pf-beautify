const { ServicesReview } = require("../../db");

const deleteReview = async (id) => {
  const review = await ServicesReview.findByPk(id);
  if (!review) return { deleted: "succesfull" };
  await review.destroy();
  return { deleted: "succesfull" };
};

module.exports = deleteReview;
