const { Router } = require("express");
const postServicesReviews = require("../controllers/ServicesReviews/postServicesReviews");

const servicesReviewsRouter = Router();

servicesReviewsRouter.post("/", async (req, res) => {
  try {
    const reviewInfo = req.body;
    const review = await postServicesReviews(reviewInfo);
    return res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = servicesReviewsRouter;
