const { ServicesReview, Service } = require("../../db");

const postServicesReviews = async ({
  clientId,
  serviceId,
  professionalId,
  rate,
  title,
  comment,
}) => {
  const newReview = await ServicesReview.create({ rate, title, comment });
  await newReview.setClient(clientId);
  await newReview.setService(serviceId);
  await newReview.setProfessional(professionalId);
  return newReview;
};

module.exports = postServicesReviews;
