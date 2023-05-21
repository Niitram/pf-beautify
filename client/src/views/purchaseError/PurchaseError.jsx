import { Link } from "react-router-dom";
import styles from "./PurchaseError.module.css";

function PurchaseError() {
  return (
    <div className={styles.container}>
      <div className={styles.iconFail}></div>
      <h1>
        We're very sorry, it seems that something has gone wrong with the
        purchase
      </h1>
      <Link to="/cart">Try again, view my cart</Link>
      <Link to="/products">View more products</Link>
    </div>
  );
}

export default PurchaseError;
