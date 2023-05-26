const { Client, Service, Professional } = require("../db.js");

const postAppointmentValidation = async (req, res, next) => {
  const { date, hour, professionalId, clientId, serviceId } = req.body;
  if (!date || !hour) {
    return res
      .status(400)
      .json({ message: "Date and time are required fields" });
  }
  if (
    professionalId &&
    !Number.isInteger(professionalId) &&
    professionalId < 1
  ) {
    return res
      .status(400)
      .json({ message: "Practitioner ID must be a positive integer" });
  }
  if (clientId && !Number.isInteger(clientId) && clientId < 1) {
    return res
      .status(400)
      .json({ message: "Client ID must be a positive integer" });
  }
  if (serviceId && !Number.isInteger(serviceId) && serviceId < 1) {
    return res
      .status(400)
      .json({ message: "Service ID must be a positive integer" });
  }
  if (professionalId) {
    const professional = await Professional.findByPk(professionalId);
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }
  }
  if (clientId) {
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
  }
  if (serviceId) {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: "service not found" });
    }
  }
  next();
};

module.exports = {
  postAppointmentValidation,
};
