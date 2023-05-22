const express = require("express");
const { Purchase } = require("../db");
require("dotenv").config();
const { ACESS_TOKEN, BACK_ROUTE, ROUTE } = process.env;
const approved = require("../controllers/MercadoPago/approved");
const router = express();
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: `${ACESS_TOKEN}`,
});

router.post("/create_preference", async (req, res) => {
  let preference = {
    external_reference: req.body.pop(),
    items: req.body,
    back_urls: {
      success: `${BACK_ROUTE}mercadopago/feedback`,
      failure: `${BACK_ROUTE}mercadopago/feedback`,
      pending: `${BACK_ROUTE}mercadopago/feedback`,
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(async function (response) {
      await Purchase.create({
        preferenceId: response.body.id,
        clientMail: response.body.external_reference,
        returnUrl: req.headers.origin,
      });
      res.json({
        id: response.body.id,
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

    if (req.query.status === "approved") {
      const response = await approved(products.preferenceId, email);
      res.status(200).redirect(`${products.returnUrl}/#/purchaseSuccess`);
    } else {
      const purchase = await Purchase.findAll({ where: { clientMail: email } });
      purchase.forEach(async (each) => {
        await each.destroy();
      });
      res.status(402).redirect(`${products.returnUrl}/#/purchaseError`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
