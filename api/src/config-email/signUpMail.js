
const sendMail = require('./sendMail')


const sendContactMail = async  (name, email) => {
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
     
    <p>Dear<b> ${name}</b>!!</p>



<p> On behalf of the entire Beautify team, we are delighted to extend a warm welcome to our online store. 
We are excited that you have decided to join our community and trust us with your beauty needs.</br>
At Beautify, we strive to provide you with an exceptional shopping experience and high-quality products </br> 
that will enhance your natural beauty. Our goal is to offer you a wide range of options, </br>
from cosmetics to skincare and hair care products, that will allow you to express your unique style and </br>
feel radiant on every occasion.</br>
We understand that placing trust in an online store can be an important step, </br>
so we are committed to providing you with exceptional customer service at every stage </br>
of your shopping experience. If you have any questions, concerns, or need advice, our customer </br>
support team will be delighted to assist you at all times.</br>
We invite you to explore our online store and discover the extensive selection of beauty products we</br>
have prepared for you. Also, don't miss out on our special promotions, news, and beauty tips that we </br>
regularly share on our blog and social media channels.</br>
We want you to feel part of the Beautify community and stay updated on the latest trends and launches.</br>
</p>


<p>Once again, we warmly welcome you to Beautify. </br>
We are eager to be part of your journey towards a brighter beauty and we are confident that you </br>
will find everything you need to enhance your personal style. </br>
Enjoy your shopping experience and do not hesitate to contact us if you need any assistance!</p></br>

<p class="word">Best wishes</p>
<h2 class="word">The Beautify team</h2>
    </div >
    <div class="imagen">
      
   </div>

    </div>
   </main>
  </body>
</html>
`
const mail = {
  to:  email,
  subject: "Welcome to Beautify!",
  html: html,
};
sendMail(mail).catch(error => console.log(error))
}

module.exports = sendContactMail
