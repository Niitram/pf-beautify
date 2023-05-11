const {Appointment,Profesional,Service}=require('../../db.js')

const getAppointmentByClient = async (clientId)=>{ 
const appointments = await Appointment.findAll({
    where: { clientId },
    include: [
      { model: Profesional, attributes: ["fullname"] },
      { model: Service, attributes: ["name"] },
      
    ]

})
return appointments;
}

module.exports=getAppointmentByClient;