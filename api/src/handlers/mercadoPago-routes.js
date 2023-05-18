const express = require("express");
const { Purchase } = require("../db");
const axios = require("axios");
require("dotenv").config();
const postNewShopValidation = require('../validations/postNewShop')
const { ACESS_TOKEN } = process.env;
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
      success: "http://localhost:3001/mercadopago/feedback",
      failure: "http://localhost:3001/mercadopago/feedback",
      pending: "http://localhost:3001/mercadopago/feedback",
    },
    auto_return: "approved",
  };
 

  mercadopago.preferences
    .create(preference)
    .then(async function (response) {
      await Purchase.create({
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
  try {
    const email = req.query.external_reference;
    const products = await Purchase.findOne({ where: { clientMail: email } });
    if (req.query.status === "approved") {
      const response = await approved(products.preferenceId, email);
      res.status(200).redirect("http://localhost:5173/home");
    }else {
		res.status(402).redirect("http://localhost:5173/home");
	}
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
