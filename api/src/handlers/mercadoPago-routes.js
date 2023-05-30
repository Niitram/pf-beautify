const express = require("express");
const { Purchase } = require("../db");
require("dotenv").config();
const { ACESS_TOKEN, BACK_ROUTE, ROUTE } = process.env;
const approved = require("../controllers/MercadoPago/approved");
const router = express();
const mercadopago = require("mercadopago");
const {
  createAppointment,
} = require("../controllers/Appointments/postAppointmentByClient");
mercadopago.configure({
  access_token: `${ACESS_TOKEN}`,
});

router.post("/create_preference", async (req, res) => {
  const external_reference = req.body.pop();
  const items = req.body;
  console.log(items);
  const returnUrl = req.headers.origin;
  let preference = {
    external_reference,
    items,
    back_urls: {
      success: `${BACK_ROUTE}/mercadopago/feedback`,
      failure: `${BACK_ROUTE}/mercadopago/feedback`,
      pending: `${BACK_ROUTE}/mercadopago/feedback`,
    },
    auto_return: "approved",
  };
  mercadopago.preferences
    .create(preference)
    .then(async function (response) {
      const preferenceId = response.body.id;
      const clientMail = response.body.external_reference;
      await Purchase.create({
        preferenceId,
        clientMail,
        returnUrl,
      });
      res.json({
        id: preferenceId,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post("/service_preference", async (req, res) => {
  const external_reference = req.body.pop();
  const appointmentData = JSON.stringify(req.body.pop());
  const items = req.body;
  let preference = {
    external_reference,
    items,
    back_urls: {
      success: `${BACK_ROUTE}/mercadopago/feedbackService`,
      failure: `${BACK_ROUTE}/mercadopago/feedbackService`,
      pending: `${BACK_ROUTE}/mercadopago/feedbackService`,
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(async function (response) {
      const clientMail = response.body.external_reference;
      const preferenceId = response.body.id;
      const returnUrl = req.headers.origin;
      await Purchase.create({
        preferenceId,
        appointmentData,
        clientMail,
        returnUrl,
      });
      res.json({
        id: preferenceId,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/feedback", async (req, res) => {
  try {
    const email = req.query.external_reference;
    const toDelete = await Purchase.findAll({ where: { clientMail: email } });
    for (let i = 0; i < toDelete.length - 1; i++) {
      toDelete[i].destroy();
    }

    const products = toDelete[0].dataValues;
    const preferenceId = products.preferenceId;
    const returnUrl = products.returnUrl;
    if (req.query.status === "approved") {
      const response = await approved(preferenceId, email);
      res.status(200).redirect(`${returnUrl}/#/purchaseSuccess`);
    } else {
      const purchase = await Purchase.findAll({ where: { clientMail: email } });
      purchase.forEach(async (each) => {
        await each.destroy();
      });
      res.status(402).redirect(`${returnUrl}/#/purchaseError`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/feedbackService", async (req, res) => {
  try {
    const email = req.query.external_reference;
    const toDelete = await Purchase.findAll({ where: { clientMail: email } });
    for (let i = 0; i < toDelete.length - 1; i++) {
      toDelete[i].destroy();
    }
    const service = toDelete[0].dataValues;
    const appointmentData = service.appointmentData;
    const returnUrl = service.returnUrl;
    const { profesionalId, clientId, serviceId, date, hour, paid } =
      JSON.parse(appointmentData);
    if (req.query.status === "approved") {
      const response = await createAppointment(
        profesionalId,
        clientId,
        serviceId,
        date,
        hour,
        paid
      );
      res.status(200).redirect(`${returnUrl}/#/purchaseSuccess`);
    } else {
      const service = await Purchase.findAll({ where: { clientMail: email } });
      service.forEach(async (each) => {
        await each.destroy();
      });
      res.status(402).redirect(`${returnUrl}/#/purchaseError`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
