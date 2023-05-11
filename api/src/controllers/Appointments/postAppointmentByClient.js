const { Appointment, Client, Service,Profesional } = require('../../db.js')

const createAppointment = async ( profesionalId, clientId, serviceId,date, hour) => {
    const appointment = await Appointment.create({
        profesionalId,
        clientId,
        serviceId,
        date,
        hour
    });

    const professional = await Profesional.findByPk(profesionalId);
    await appointment.setProfesional(professional);

    const client = await Client.findByPk(clientId);
    await appointment.setClient(client);

    const service = await Service.findByPk(serviceId);
    await appointment.setService(service);

    return appointment;
}

module.exports = {
    createAppointment 
}