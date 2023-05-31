const { Appointment, Client, Service, Profesional } = require('../../db.js')
const sendMailOnAppointment  = require('../../config-email/sendMailOnAppointment.js')
const createAppointment = async (profesionalId, clientId, serviceId, date, hour, paid) => {
    const appointment = await Appointment.create({
        paid,
        date,
        hour
    });

    const professional = await Profesional.findByPk(profesionalId);
    const client = await Client.findByPk(clientId);
    const service = await Service.findByPk(serviceId);

    await appointment.setProfesional(professional);
    await appointment.setClient(client);
    await appointment.setService(service);

    
   await sendMailOnAppointment(client.fullName, service.dataValues, appointment, professional.fullname, client.email)
    return appointment;
}

module.exports = {
    createAppointment
}