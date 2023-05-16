const {Appointment,Client,Service,Profesional} = require("../../db.js");

const updateAppointment = async(appointmentId,newData) => {
   
    const appointment = await Appointment.findByPk(appointmentId);
    await appointment.update(newData);
    const profesional = await Profesional.findByPk(newData.ProfesionalId);
    await appointment.setProfesional(profesional);
    const service = await Service.findByPk(newData.ServiceId);
    await appointment.setService(service);
    await appointment.save()
     return appointment;
// return {message:"Appointment updated successfully"}
}

module.exports = updateAppointment;