const { Router } = require("express");
const postServicesReviews = require("../controllers/ServicesReviews/postServicesReviews");
const getReviewsByServiceId = require("../controllers/ServicesReviews/getReviewsByServiceId");
const getReviewsByProfessionalId = require("../controllers/ServicesReviews/getReviewsByProfessional");
const getReviewsByClientId = require("../controllers/ServicesReviews/getReviewsByClientId");
const deleteReview = require("../controllers/ServicesReviews/deleteReview");
const {
  postServiceReviewsValidation,
  getReviewByClientValidation,
  getReviewByServiceValidation,
  getReviewByProfessionalValidation,
  deleteReviewValidation,
} = require("../validations/servicesReviewsValidations");

const servicesReviewsRouter = Router();

servicesReviewsRouter.post(
  "/",
  postServiceReviewsValidation,
  async (req, res) => {
    try {
      const reviewInfo = req.body;
      const review = await postServicesReviews(reviewInfo);
      return res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

servicesReviewsRouter.get(
  "/byProfessional/:professionalId",
  getReviewByProfessionalValidation,
  async (req, res) => {
    try {
      const { professionalId } = req.params;
      const reviews = await getReviewsByProfessionalId(professionalId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

servicesReviewsRouter.get(
  "/byService/:serviceId",
  getReviewByServiceValidation,
  async (req, res) => {
    try {
      const { serviceId } = req.params;
      const reviews = await getReviewsByServiceId(serviceId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

servicesReviewsRouter.get(
  "/byClient/:clientId",
  getReviewByClientValidation,
  async (req, res) => {
    try {
      const { clientId } = req.params;
      const reviews = await getReviewsByClientId(clientId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

servicesReviewsRouter.delete(
  "/:reviewId",
  deleteReviewValidation,
  async (req, res) => {
    try {
      const { reviewId } = req.params;
      const deletedReview = await deleteReview(reviewId);
      res.status(200).json(deletedReview);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = servicesReviewsRouter;
