const { Appointment, Client, Profesional, Service } = require('../../db.js');

const getAppointmentsByServiceAndDate = async (serviceId, date) => {
  // * horario de atención
  const schedule = ["09:00:00", "10:15:00", "11:30:00", "14:00:00", "16:15:00", "17:30:00", "18:45:00"];

  // * busco los appointments existentes para el servicio y la fecha especificados
  const appointments = await Appointment.findAll({
    where: { ServiceId: serviceId, date:date },
    include: [
      { model: Profesional, attributes: ["fullname"] },
      { model: Client, attributes: ["fullName"] },
      { model: Service, attributes: ["name"] }
    ]
  });

  //* Aqui se crea  un arreglo con todas las horas disponibles inicialmente
  const availableHours = schedule.map(hour => ({ hour, available: true }));

  //*  Marcar como no disponibles las horas ocupadas por los appointments existentes
  appointments.forEach(appointment => {
    const appointmentHour = appointment.hour;
    const index = availableHours.findIndex(item => item.hour === appointmentHour);
    if (index !== -1) {
      availableHours[index].available = false;
    }
  });

  return availableHours;
};

module.exports = getAppointmentsByServiceAndDate;
