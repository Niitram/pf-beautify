import { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { Wallet } from "@mercadopago/sdk-react";
import { Skeleton } from "@mui/material";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    setPreferenceId(JSON.parse(localStorage.getItem("preference")));
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, []);
  let total = 0;
  const count =
    cart.length &&
    cart.forEach((element) => {
      total += element.price * element.quantity;
    });
  const tax = (total * 0.07).toFixed(2);
  const shipping = (total * 0.1).toFixed(2);
  const totalPayment = (total - tax - shipping).toFixed(2);

  return (
    <div className={styles.container}>
      <div className={styles.aux}>
        <div className={styles.pasarela}>
          <div className={styles.resumen}>
            <h1>Summary</h1>
            <br />
            <div className={styles.datos}>
              <h4>Total price:</h4>
              <h4>${total.toFixed(2)}</h4>
            </div>
            {/* <div className={styles.datos}>
              <h4>Shipping:</h4>
              <h4>${shipping}</h4>
            </div>
            <div className={styles.datos}>
              <h4>Tax:</h4>
              <h4>${tax}</h4>
            </div>
            <div className={styles.datos} style={{ marginTop: "50%" }}>
              <h4>Total Amount to pay:</h4>
              <h4>${totalPayment}</h4>
            </div> */}
          </div>
          <div className={styles.mercadopago}>
            {preferenceId ? (
              <Wallet initialization={{ preferenceId: `${preferenceId}` }} />
            ) : (
              <Skeleton height={40} width={150} variant="rectangular" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
