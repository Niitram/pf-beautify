const {Appointment,Client,Profesional,Service}=require('../../db.js');


const getAppoinmentsByService = async(serviceId)=>{
    const appointmentByService = await Appointment.findAll({
        where: { ServiceId:serviceId},
        include: [
          { model: Profesional, attributes: ["fullname"] },
          { model: Client, attributes: ["fullName"] },
          {model:Service,attributes:["name"]}
        ]
    })
    return appointmentByService;
}

module.exports = getAppoinmentsByService;