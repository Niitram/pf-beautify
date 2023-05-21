const mail = require('./nodemailer.js');
const nodemailer = require('nodemailer');
const { Client } = require("../db");


const sendMailByShop = async (clientId, shop, callback = mail) => {
    const client = await Client.findByPk(clientId);



    const mailOptions = {
        from: 'Beautify <beautifyfinalproyect@gmail.com>',
        to: ` ${client.email}`,
        subject: 'Gracias por tu compra',
        html: `<!DOCTYPE html>
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
        <p>Hola  <b>${client.fullName} </b>,Hemos registrado tu compra con exito con el numero <span>${shop.id}</span> con un descuento total de $<span>${shop.discount}</span>. El resultado de tu compra fue por el monto total de $<span> ${shop.amount}</span>. Gracias por preferir nuestros productos, te mantendremos informado(a) de nuestros proximos descuentos y promociones.
        </div>
        
        <br>
        <p class="word">Atentamente,</p>
        <h2 class="word">Beautify</h2>
            </div >
            <div class="imagen">
              
           </div>
        
            </div>
           </main>
          </body>
        </html>
        
    `
    };

    // Llamar a la función `mail` y pasar `mailOptions` como argumento
    await mail((accountTransport) => {
        const transporter = nodemailer.createTransport(accountTransport);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
            } else {
                console.log('Correo enviado:', info.response);
            }
        });
    }, mailOptions);
}

module.exports = sendMailByShop;