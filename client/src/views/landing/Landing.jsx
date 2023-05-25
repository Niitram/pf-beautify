import logo from "../../assets/images/LandingImg.svg";
import styles from "./Landing.module.css";
import { useNavigate } from "react-router-dom";

export default function Landing({ handleLoginClick }) {
  const navigate = useNavigate();

  return (
    <div className={styles.Container}>
      <div className={styles.EmbraceYourBeauty}>
        <div className={styles.containerText}>
          <h2>
            <strong className={styles.strong}>Embrace your</strong>
          </h2>
          <h2 className={styles.beauty}>beauty</h2>
        </div>
        <div className={styles.containerButton}>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLoginClick();
              /*  navigate("/home"); */
            }}
            className={styles.Login}
          >
            <p>Continue</p>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/home");
            }}
            className={styles.guest}
          >
            <p>Guest</p>
          </button>
        </div>
      </div>

      <img className={styles.imagenPrincipal} src={logo} alt="logo" />
    </div>
  );
}
