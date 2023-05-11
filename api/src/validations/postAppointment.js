const { Client, Service,Profesional }= require('../db.js')

const postAppointmentValidation =  async (req, res, next) => {
    const { date, hour, profesionalId, clientId, serviceId } = req.body;
    if (!date || !hour) {
        return res.status(400).json({ message: "Fecha y hora son campos obligatorios" });
      }
      if (profesionalId && !Number.isInteger(profesionalId) && profesionalId < 1) {
        return res.status(400).json({ message: "El ID del profesional debe ser un entero positivo" });
      }
      if (clientId && !Number.isInteger(clientId) && clientId < 1) {
        return res.status(400).json({ message: "El ID del cliente debe ser un entero positivo" });
      }
      if (serviceId && !Number.isInteger(serviceId ) && serviceId  < 1) {
        return res.status(400).json({ message: "El ID del servicio debe ser un entero positivo" });
      }
      if (profesionalId) {
        const profesional = await Profesional.findByPk(profesionalId);
        if (!profesional) {
          return res.status(404).json({ message: "Profesional no encontrado" });
        }
      }
      if (clientId) {
        const client = await Client.findByPk(clientId);
        if (!client) {
         
          return res.status(404).json({ message: "Cliente no encontrado" });
        }
   
      }
      if (serviceId) {
        const service = await Service.findByPk(serviceId);
        if (!service) {
          return res.status(404).json({ message: "Servicio no encontrado" });
        }
      }
 next();
}

module.exports={
    postAppointmentValidation
}