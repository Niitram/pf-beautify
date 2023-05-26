const { ServicesReview, Client, Service, Professional } = require("../db");

const postServiceReviewsValidation = async (req, res, next) => {
  const { clientId, serviceId, professionalId, rate, title, comment } =
    req.body;

  const idsValues = [clientId, serviceId, professionalId];
  const stringsValues = [title, comment];

  if (!idsValues.every((numericVar) => typeof numericVar === "number"))
    return res.status(400).json({ error: "Incomplete Data" });
  if (!idsValues.every((id) => Math.floor(id) === id))
    return res.status(400).json({ error: "Ids must be integers" });

  if (!stringsValues.every((stringV) => stringV.length))
    return res.status(400).json({ error: "Incomplete data" });
  if (!stringsValues.every((stringV) => stringV.length < 255))
    return res.status(400).json({ error: "Too long strings" });
  if (!stringsValues.every((stringV) => typeof stringV === "string"))
    return res.status(400).json({ error: "title and comment must be strings" });

  if (!typeof rate === "number")
    return res.status(400).json({ error: "rate must be a number" });

  try {
    const client = await Client.findByPk(clientId);
    if (!client) return res.status(400).json({ error: "Client not found" });

    const professional = await Professional.findByPk(professionalId);
    if (!professional)
      return res.status(400).json({ error: "Professional not found" });

    const service = await Service.findByPk(serviceId);
    if (!service) return res.status(400).json({ error: "Service not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

const getReviewByClientValidation = async (req, res, next) => {
  const { clientId } = req.params;
  const numericId = Number(clientId);

  if (String(numericId) === "NaN" || numericId !== Math.floor(numericId))
    return res.status(400).json({ error: "Client Id must be an integer" });

  const client = await Client.findByPk(clientId);
  console.log(client);
  if (!client) return res.status(404).json({ error: "Client not found" });
  next();
};

const getReviewByServiceValidation = async (req, res, next) => {
  const { serviceId } = req.params;
  const numericId = Number(serviceId);

  if (String(numericId) === "NaN" || numericId !== Math.floor(numericId))
    return res.status(400).json({ error: "Service Id must be an integer" });

  const service = await Service.findByPk(serviceId);
  if (!service) return res.status(404).json({ error: "Service not found" });
  next();
};

const getReviewByProfessionalValidation = async (req, res, next) => {
  const { professionalId } = req.params;
  const numericId = Number(professionalId);

  if (String(numericId) === "NaN" || numericId !== Math.floor(numericId))
    return res
      .status(400)
      .json({ error: "Professional Id must be an integer" });

  const professional = await Professional.findByPk(professionalId);
  if (!professional)
    return res.status(404).json({ error: "Professional not found" });
  next();
};

const deleteReviewValidation = (req, res, next) => {
  const { reviewId } = req.params;
  const numericId = Number(reviewId);

  if (String(numericId) === "NaN" || numericId !== Math.floor(numericId))
    return res.status(400).json({ error: "Review Id must be an integer" });

  next();
};

module.exports = {
  postServiceReviewsValidation,
  getReviewByClientValidation,
  getReviewByServiceValidation,
  getReviewByProfessionalValidation,
  deleteReviewValidation,
};
