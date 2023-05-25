const express = require("express");
const sendContactMail = require("../config-email/sendContactMail");
const router = express();
const nodemailer = require("nodemailer");
const accountTransport = require('../config-email/account-transporter.json')


const contactEmail = nodemailer.createTransport(accountTransport);

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/", async (req, res) => {
    try {
        const {name, email, message } = req.body
        const response = await sendContactMail(name, email, message, contactEmail)
        res.json({ status: "Message Sent" })
    } catch (error) {
        res.json({ status: "ERROR" })
    }
    
  });




  module.exports = router