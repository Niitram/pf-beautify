const { Appointment } = require('../../db.js')

const deleteAppointment = async (appointmentId) => {
   
      const appointment = await Appointment.findByPk(appointmentId);
      await appointment.destroy();
      return { message: "Cita eliminada correctamente" };
  
  };

module.exports = deleteAppointment;