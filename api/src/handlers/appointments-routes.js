const router = require("express").Router();
const {
  createAppointment,
} = require("../controllers/Appointments/postAppointmentByClient.js");
const {
  postAppointmentValidation,
} = require("../validations/postAppointment.js");
const getAppointmentByClient = require("../controllers/Appointments/getAppoinmentsByClient.js");
const getAppoinmentsByService = require("../controllers/Appointments/getAppointmentsByService.js");
const getAppointmentsByAdmin = require("../controllers/Appointments/getAppointmentsByAdmin.js");
const getAppointmentByProfesional = require("../controllers/Appointments/getAppointmentsByProfesional.js");
const validationAppointment = require("../validations/validationAppointment.js");
const deleteAppointment = require("../controllers/Appointments/deleteAppointment.js");
const updateAppointment = require("../controllers/Appointments/updateAppointment.js");
const validationUpdateAppointment = require("../validations/validationUpdateAppointment.js");
const getAppointmentsByServiceAndDate = require("../controllers/Appointments/getAppointmentsByServiceAndDate.js");

router.get("/", async (req, res) => {
  const appointments = await getAppointmentsByAdmin();
  try {
    if (appointments.length === 0) {
      res.status(404).json({ message: "There are no registered appointments" });
    } else {
      res.status(200).json(appointments);
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting registered appointments" });
  }
});

router.get("/client/:clientId", async (req, res) => {
  const { clientId } = req.params;

  const appointmentsOfClient = await getAppointmentByClient(clientId);
  try {
    if (appointmentsOfClient.length === 0) {
      res.status(404).json({ message: "You have no recorded appointments" });
    } else {
      res.status(200).json(appointmentsOfClient);
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting appointments" });
  }
});

router.get("/service/:serviceId", async (req, res) => {
  const { serviceId } = req.params;

  const appointmentsOfService = await getAppoinmentsByService(serviceId);
  try {
    if (appointmentsOfService.length === 0) {
      res.status(404).json({ message: "You have no recorded appointments" });
    } else {
      res.status(200).json(appointmentsOfService);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting citations for this service" });
  }
});
router.get("/service/:serviceId/date/:dateId", async (req, res) => {
  const { serviceId, dateId } = req.params;

  const hoursOfService = await getAppointmentsByServiceAndDate(
    serviceId,
    dateId
  );
  try {
    if (hoursOfService.length === 0) {
      res.status(404).json({ message: "You have no recorded appointments" });
    } else {
      res.status(200).json(hoursOfService);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting citations for this service" });
  }
});

router.get("/profesional/:profesionalId", async (req, res) => {
  const { profesionalId } = req.params;
  const appointments = await getAppointmentByProfesional(profesionalId);
  try {
    if (appointments.length === 0) {
      res.status(404).json({
        message: "There are no registered appointments",
      });
    } else {
      res.status(200).json(appointments);
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting registered appointments" });
  }
});

router.post("/", postAppointmentValidation, async (req, res) => {
  try {
    const { profesionalId, clientId, serviceId, date, hour, paid } = req.body;

    const appointmentCreated = await createAppointment(
      profesionalId,
      clientId,
      serviceId,
      date,
      hour,
      paid
    );

    res.status(201).json(appointmentCreated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating appointment" });
  }
});

router.patch(
  "/:appointmentId/",
  validationUpdateAppointment,
  async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const newData = req.body;
      const updateData = updateAppointment(appointmentId, newData);
      return res.status(201).json({ message: "updated successfully" });
    } catch (error) {
      return res.status(500).json({ Error: "Error trying to update data" });
    }
  }
);

router.delete("/:appointmentId", validationAppointment, async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointmentDeleted = await deleteAppointment(appointmentId);
    res.status(204).json(appointmentDeleted);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error trying to delete the selected appointment" });
  }
});

module.exports = router;
