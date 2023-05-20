const mail = require('./nodemailer.js');
const nodemailer = require('nodemailer');



const sendMail = async (email,name, callback=mail) => {

    const mailOptions = {
    from: 'Beautify <beautifyfinalproyect@gmail.com>',
    to:` ${email}`,
    subject: 'Bienvenido a Beautify',
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
        width:100%
      }
      main{
        width:100%vw;
        height:100vh;
        display:flex;
        flex-direction:column;
        border-bottom-left-radius: 25px;
        border-bottom-right-radius: 25px;
        overflow: hidden; 
      }
    .container{
      display:block;

      width:100%;
      height:100%;
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
      background-position: center center; /* Ajusta la posición de la imagen aquí */
      height: 200px;
      width: 100%;
      display: flex;
      justify-content: center;
      
    }
     p,h2{
        color:black
     }
    
      </style>
      </head>
      <body>
       <main>
        <div class="top"></div>
        <div class="container">
         
        <p>Hola<b> ${name}</b>!!</p>
    
    
    
    <p> Nos complace darte la más cordial bienvenida a Beautify. Queremos expresar nuestro agradecimiento por unirte a nuestra comunidad y confiar en nosotros.
    En <b>Beautify</b>, nos enorgullece brindarte productos y servicios de calidad excepcional. Estamos comprometidos a ofrecerte una experiencia única y satisfactoria en cada interacción.Nuestro equipo está aquí para ayudarte en todo momento. Si tienes alguna pregunta, consulta o necesitas asistencia adicional, no dudes en contactarnos.Te invitamos a explorar todo lo que tenemos para ofrecerte. Descubre nuestras amplias opciones de productos y beneficios exclusivos para ti como miembro de nuestra comunidad.</p>
    
    
    <p>Una vez más, te damos la bienvenida a Beautify. Esperamos ser parte de tus experiencias más gratificantes y estamos ansiosos por atender todas tus necesidades.</p>
    
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

module.exports=sendMail;