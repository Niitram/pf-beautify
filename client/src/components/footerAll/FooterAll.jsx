import styles from "./FooterAll.module.css";
import face from "../../assets/images/facebook.svg";
import insta from "../../assets/images/instagram.svg";
export default function FooterAll() {
  return (
    <div className={styles.footer}>
      <div className={styles.contain}>
        <div className={styles.col}>
          <h1>Views</h1>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Products</li>
            <li>Services</li>
          </ul>
        </div>
        <div className={styles.social}>
          <h1>Social</h1>
          <ul>
            <li>
              <img src={face} alt="face" />
            </li>
            <li>
              <img src={insta} alt="instagram" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
