const { Appointment, Client, Service, Professional } = require("../../db.js");

const createAppointment = async (
  professionalId,
  clientId,
  serviceId,
  date,
  hour
) => {
  const appointment = await Appointment.create({
    date,
    hour,
  });

  const professional = await Professional.findByPk(professionalId);
  const client = await Client.findByPk(clientId);
  const service = await Service.findByPk(serviceId);

  await appointment.setProfessional(professional);
  await appointment.setClient(client);
  await appointment.setService(service);

  return appointment;
};

module.exports = {
  createAppointment,
};
