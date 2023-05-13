const { Appointment}= require('../db.js')

const deleteAppointment = async (req,res,next)=>{
const {appointmentId} = req.params;
const appointment = await Appointment.findByPk(appointmentId);
if (!appointment) {
  return res.status(400).json({messge:"The citation with the provided id was not found" });
}

next();
}
module.exports=deleteAppointment;