const { Appointment}= require('../db.js')

const deleteAppointment = async (req,res,next)=>{
const {appointmentId} = req.params;
const appointment = await Appointment.findByPk(appointmentId);
if (!appointment) {
  return res.status(400).json({messge:"No se encontró el cita con el id proporcionado" });
}

next();
}
module.exports=deleteAppointment;