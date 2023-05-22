



const sendContactMail = async  (name, email, message, contactEmail) => {



const mail = {
  from: name,
  to: "beautifyfinalproyect@gmail.com",
  subject: "Contact Form Submission",
  html: `<p>Name: ${name}</p>
         <p>Email: ${email}</p>
         <p>Message: ${message}</p>`,
};
contactEmail.sendMail(mail);
}

module.exports = sendContactMail
