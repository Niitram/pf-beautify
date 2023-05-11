const router = require("express").Router();
const { createAppointment } = require('../controllers/Appointments/postAppointmentByClient.js');
const { postAppointmentValidation } = require('../validations/postAppointment.js');
const getAppointmentByClient = require('../controllers/Appointments/getAppoinmentsByClient.js');
const getAppoinmentsByService = require('../controllers/Appointments/getAppointmentsByService.js');
const getAppointmentsByAdmin = require('../controllers/Appointments/getAppointmentsByAdmin.js');
const getAppointmentByProfesional = require('../controllers/Appointments/getAppointmentsByProfesional.js');
const validationAppointment = require('../validations/validationAppointment.js');
const deleteAppointment = require('../controllers/Appointments/deleteAppointment.js');

router.get("/", async (req, res) => {
    const appointments = await getAppointmentsByAdmin();
    try {
        if (appointments.length === 0) {
            res.status(404).json({ message: 'No hay citas registradas' });
        } else {
            res.status(200).json(appointments);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas registradas' });
    }
})

router.get('/client/:clientId', async (req, res) => {
    const { clientId } = req.params;

    const appointmentsOfClient = await getAppointmentByClient(clientId);
    try {
        if (appointmentsOfClient.length === 0) {
            res.status(404).json({ message: 'No tiene citas registradas' });
        } else {
            res.status(200).json(appointmentsOfClient);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas' });
    }
})

router.get('/service/:serviceId', async (req, res) => {
    const { serviceId } = req.params;

    const appointmentsOfService = await getAppoinmentsByService(serviceId);
    try {
        if (appointmentsOfService.length === 0) {
            res.status(404).json({ message: 'No tiene citas registradas' });
        } else {
            res.status(200).json(appointmentsOfService);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas sobre este servicio' });
    }
})

router.get("/profesional/:profesionalId", async (req, res) => {
    const { profesionalId } = req.params;
    const appointments = await getAppointmentByProfesional(profesionalId);
    try {
        if (appointments.length === 0) {
            res.status(404).json({ message: 'No hay citas registradas' });
        } else {
            res.status(200).json(appointments);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas registradas' });
    }
})

router.post("/", postAppointmentValidation, async (req, res) => {

    try {
        const { profesionalId, clientId, serviceId, date, hour } = req.body;

        const appointmentCreated = await createAppointment(profesionalId, clientId, serviceId, date,
            hour);

        res.status(201).json(appointmentCreated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la cita" });
    }
});



router.delete("/:appointmentId", validationAppointment, async (req, res) => {
    const { appointmentId } = req.params;
    try {
        const appointmentDeleted = await deleteAppointment(appointmentId)
        res.status(204).json(appointmentDeleted)
    } catch (error) {
        res.status(500).json({ message: "Error al intentar borrar la cita selecionada" })
    }
})

module.exports = router;