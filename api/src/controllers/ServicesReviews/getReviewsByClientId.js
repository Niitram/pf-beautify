const { ServicesReview } = require("../../db");

const getReviewsByClientId = async (clientId) => {
  const reviews = await ServicesReview.findAll({
    where: { ClientId: clientId },
  });
  return reviews;
};

module.exports = getReviewsByClientId;
