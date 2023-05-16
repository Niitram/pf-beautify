const {Appointment,Profesional,Service,Client}=require('../../db.js')

const getAppointmentByProfesional = async (profesionalId)=>{ 
const appointments = await Appointment.findAll({
    where: { ProfesionalId:profesionalId},
    include: [
      { model: Profesional, attributes: ["fullname"] },
      { model: Service, attributes: ["name"] },
      {model:Client,attributes:["fullName"]}
    ]

})
return appointments;
}

module.exports=getAppointmentByProfesional;