import logo from "../../assets/images/LandingImg.svg";
import styles from "./Landing.module.css";
import { useNavigate } from "react-router-dom";

export default function Landing({ loginVisible, handleLoginClick }) {
  const navigate = useNavigate();

  return (
    <div className={styles.Container}>
      <div className={styles.EmbraceYourBeauty}>
        <h2>
          <strong>Embrace your</strong>
        </h2>
        <h2 className={styles.beauty}>beauty</h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLoginClick();
            /*  navigate("/home"); */
          }}
          className={styles.Login}
        >
          Login / Register
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/home");
          }}
          className={styles.Login}
        >
          Invited
        </button>
      </div>

      <img src={logo} alt="logo" />
    </div>
  );
}
