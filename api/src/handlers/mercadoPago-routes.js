const express = require("express");
const { Cart } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { ACESS_TOKEN } = process.env;
const approved = require("../controllers/MercadoPago/approved");
const router = express();
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: `${ACESS_TOKEN}`,
});

router.post("/create_preference", async (req, res) => {
  let preference = {
    items: req.body,
    external_reference: "una referencia",
    back_urls: {
      success: "http://localhost:3001/mercadopago/feedback",
      failure: "http://localhost:3001/mercadopago/feedback",
      pending: "http://localhost:3001/mercadopago/feedback",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(async function (response) {
      console.log(response.body);
      await Cart.create({
        preferenceId: response.body.id,
        clientMail: response.body.external_reference,
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
  const email = req.query.external_reference;
  const products = await Cart.findOne({ where: email });
  if (req.query.status === "approved") {
    const response = await approved(products.preferenceId);
    res.redirect("http://localhost:5173/home");
  }

  res.status(200);
  //res.send(`<script> window.location.href = "http://localhost:5173/home"; alert('Your transaction was: ${req.query.status}'); </script>`)
});

module.exports = router;

