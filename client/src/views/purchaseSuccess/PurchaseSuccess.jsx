import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteCart } from "../../request/cart";
import styles from "./PurchaseSuccess.module.css";

function PurchaseSuccess() {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    //recupero del localStorage el id de usuario
    const clientId = JSON.parse(localStorage.getItem("userData"))?.id;
    //borro el carrito del cliente en la base de datos y del localStorage
    deleteCart(clientId);
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("appointment", JSON.stringify({}));
    setTimeout(() => {
      navigate("/home");
    }, 5200);
  }, [navigate]);

  setInterval(() => {
    setSeconds(seconds - 1);
  }, 1000);

  return (
    <div className={styles.container}>
      <div className={styles.iconCheck}></div>
      <h1>
        <b>Congratulations!</b> The purchase has been successfully completed
      </h1>
      <h3>Thank you for choosing us</h3>
      <Link to="/home">Go to Home</Link>
      <span>you will be redirected to home page in {seconds} seconds</span>
    </div>
  );
}

export default PurchaseSuccess;
