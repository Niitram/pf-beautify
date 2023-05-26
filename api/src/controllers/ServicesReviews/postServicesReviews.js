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

  const service = await Service.findByPk(serviceId);
  const oldRates = service.arrayRates;
  await service.update({ arrayRates: [...oldRates, rate] });
  return {
    id: newReview.id,
    rate: newReview.rate,
    title: newReview.title,
    comment: newReview.comment,
    clientId: newReview.ClientId,
    serviceId: newReview.serviceId,
    professionalId: newReview.ProfessionalId,
  };
};

module.exports = postServicesReviews;
