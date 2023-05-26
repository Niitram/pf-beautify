import styles from "./FooterAll.module.css";
import face from "../../assets/images/facebook.svg";
import insta from "../../assets/images/instagram.svg";
import { Link } from "react-router-dom";

export default function FooterAll() {
  return (
    <div className={styles.footer}>
      <div className={styles.contacto}>
        <p>
          <strong>Email:</strong> beautifyfinalproyect@gmail.com
        </p>
        <p>
          <strong>Phone number</strong> +54 3794 010000
        </p>
      </div>
      <div className={styles.social}>
        <p>
          <strong>Socials</strong>
        </p>
        <img src={face} alt="face" />
        <img src={insta} alt="insta" />
      </div>
      <div className={styles.developers}>
        <p>All rights reserved to © 2023 </p>
        <Link to={"/developers"}>The developers.</Link>
      </div>
    </div>
  );
}
