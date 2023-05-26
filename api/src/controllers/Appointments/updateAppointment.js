const { Appointment, Client, Service, Professional } = require("../../db.js");

const updateAppointment = async (appointmentId, newData) => {
  const appointment = await Appointment.findByPk(appointmentId);
  await appointment.update(newData);
  const professional = await Professional.findByPk(newData.ProfessionalId);
  await appointment.setProfessional(professional);
  const service = await Service.findByPk(newData.ServiceId);
  await appointment.setService(service);
  await appointment.save();
  return appointment;
  // return {message:"Appointment updated successfully"}
};

module.exports = updateAppointment;
