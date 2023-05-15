const { Appointment}= require('../db.js')

const validationUpdateAppointment= async (req,res,next)=>{
   try{
    const {appointmentId} = req.params;
    const appointment = await Appointment.findByPk(appointmentId);
    const newData = req.body;
    if(!appointment) throw new Error('There are no appointments registered under this Id number');
    if(Object.keys(newData).length ===0) throw new Error('If you want to Update your appointment you must enter your new changes.')
    next()
   }catch(err){
    return res.json({Error:err.message})
   }
   
}
module.exports = validationUpdateAppointment;