const { ServicesReview } = require("../../db");

const getReviewsByServiceId = async (serviceId) => {
  const reviews = await ServicesReview.findAll({
    where: { ServiceId: serviceId },
  });
  return reviews;
};

module.exports = getReviewsByServiceId;
