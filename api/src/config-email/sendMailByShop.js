

const sendMail = require("./sendMail");

const sendMailByShop = async (name, purchase, email) => {
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
  <p>Dear <b>${name} </b>,
  
Thank you for your purchase at Beautify! We are excited that you have chosen our online store for your</br> 
beauty and personal care needs. This email is to confirm the details of your order. Please find all the</br>
necessary information below:
</br>
</br>
Order Number: #${purchase.id}</br>
Purchase Date: ${Date()}</br>
Payment Method: Mercado Pago</br>
</br>
</br>
Order Details:
</br>
</br>
<ul>
  ${purchase.details.map(each => {
    return(
      `<ul>
      <li>Product: ${each.productName}</li>
      <li>Quantity: ${each.count}</li>
      <li>Price: ${each.price}</li>
      </ul> `
    )
  })}
</ul>
</br>
</br>
Subtotal: ${purchase.amount - purchase.discount}</br>
discount: ${purchase.discount}</br>
<b>Total:</b> ${purchase.amount}</br>

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
    subject: ` Purchase Confirmation - Order #${purchase.id}`,
    html: html
  };
  sendMail(mail).catch(error => console.log(error))
};
module.exports = sendMailByShop