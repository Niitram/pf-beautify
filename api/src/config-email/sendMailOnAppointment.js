
const sendMail = require("./sendMail");

const sendMailOnAppointment = async (name, service, appointment, professional, email) => {
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    *{
      margin:0;
      padding:0;
      box-sizing:border-box;
    }
    .top{
      background-image: linear-gradient(to bottom, rgba(255, 192, 203, 1), rgba(255, 192, 203, 0));
      height:100px;
      width:100%;
      padding:1rem
    }
    main{
      width:100%;
      height:auto;
      display:grid;
      grid-template-columns: 1fr;
      grid-template-rows:10% 1fr 1fr;
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
      overflow: hidden; 
    }
  .container{
    display:grid;
    grid-template-columns: 1fr;
    grid-template-rows:1fr 1fr;
    justify-content:center;
    place-items:center;
    width:100%;
    height:auto;
    text-align:justify;
    padding:2rem;
  
  }
  .container p{
    margin-top:1rem
  }
    .word, .word> h2{
    text-align:center
  }
  .imagen {
    background-image:linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent), url("https://media.istockphoto.com/id/1344899971/es/foto/esmaltes-de-u%C3%B1as-multicolores-sobre-fondo-rosa.jpg?s=612x612&w=0&k=20&c=NAbgDVFl-sU-f1MnQup_sVdh1ETQ9o9HrTd2EBx8NDc=");
    background-size: cover;
    background-repeat: repeat;
    background-position: center center; 
    height: 200px;
    width: 100%;
    display: flex;
    justify-content: center;
    
  }
  
  span{
    color:brown;
    font-weight:bold
  }
  p,h2,th{
    color:black
  }
    </style>
    </head>
    <body>
     <main>
      <div class="top"></div>
      <div class="container">
       
   
  
  <div class="content">
  <p>Dear<b>${name} </b>,
  
  
  We are pleased to confirm that we have received and scheduled your appointment at Beautify! 
  We are excited to provide you with our beauty and wellness services.
  Below, you will find the details of your appointment: </p>
  <p>
  Date and Time: ${appointment.date} at ${appointment.hour}</br>
  Estimated Duration: ${service.duration}</br>
  
  Scheduled Service: ${service.name}</br>
  Assigned Specialist: ${professional}</br>
  </p>
  <p>
  Please remember that it is important to arrive on time for your appointment so that we can provide you with the best possible service.
  If you need to cancel or reschedule your appointment, kindly contact us with at least 24 hours 
  notice so that we can offer that time to other clients.</br>

  At Beautify, we take pride in providing a welcoming and professional environment.
  Our team of highly trained specialists is ready to assist you and ensure you have an exceptional experience.</br>

  Payment Status: </br>
    <ul> 
      <li>If you have already made the advance payment, you do not need to make any further payment on-site. 
      Your appointment is fully paid, and you only need to show up at the agreed-upon time.</li>
      <li> If you have not yet made the payment, we would like to remind you that the corresponding amount for the service should be paid upon your visit. 
      Please ensure you have the exact amount or necessary payment methods available to expedite the process.</li>
    </ul>
    </br>
  If you have any additional questions or require further information, 
  please do not hesitate to reach out to us. We are here to assist you.
  </div>
  <br>
  <p class="word">Warm regards,,</p>
  <h2 class="word">Beautify</h2>
      </div >
      <div class="imagen">
     </div>
  
      </div>
     </main>
    </body>
  </html>`

  const mail = {
    to: email,
    subject: `Scheduled Appointment Information - ${service.name} at Beautify`,
    html: html
  };
  sendMail(mail).catch(error => console.log(error))
};
module.exports = sendMailOnAppointment