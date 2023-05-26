const { ServicesReview } = require("../../db");

const getReviewsByProfessionalId = async (professionalId) => {
  const reviews = await ServicesReview.findAll({
    where: { ProfessionalId: professionalId },
  });
  return reviews;
};

module.exports = getReviewsByProfessionalId;
