const {Appointment,Profesional,Client,Service}=require('../../db.js');

const getAppointmentsByAdmin = async()=>{
    const allAppointments = await Appointment.findAll({
        include: [
            { model: Profesional, attributes: ["fullname"] },
            { model: Client, attributes: ["fullName"] },
            {model:Service,attributes: ["name"]}
          ]
    })
    
    return allAppointments 
}

module.exports = getAppointmentsByAdmin;