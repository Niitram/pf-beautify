import logo from "../../assets/images/LandingImg.svg";
// import { useState } from "react";
import styles from "./Landing.module.css";
// import { useNavigate } from "react-router-dom";

export default function Landing() {
  //   const [loginVisible, setLoginVisible] = useState(false);
  //   const navigate = useNavigate();

  //   const handleLoginClick = () => {
  //     setLoginVisible(!loginVisible);
  //   };

  return (
    <div className={styles.Container}>
      <div className={styles.EmbraceYourBeauty}>
        <h2>
          <strong>Embrace your</strong>
        </h2>
        <h2 className={styles.beauty}>
          <strong>beauty</strong>
        </h2>
        <button
          className={styles.Login}
          // onClick={handleLoginClick}
        >
          <strong>Log in</strong>
        </button>
      </div>
      {/* <div
        className={styles.LoginForm}
        style={
          loginVisible
            ? { display: "flex", transition: "400ms" }
            : { display: "none", transition: "400ms" }
        }
      >
        <h4>Welcome</h4>
        <span>Log in or Sign up to continue</span>
        <div className={styles.Inputs}>
          <input type="text" placeholder="Username" className="Username" />
          <input type="text" placeholder="Password" className="Password" />
        </div>
        <button
          onClick={() => navigate("/services")}
          className={styles.BotonLogin}
        >
          Log in
        </button>
        <p>If you do not have an account please</p>
        <p>
          <strong>register</strong>
        </p>
        <hr></hr>
        <button
          onClick={() => window.open("http://localhost:3001/auth/google")}
        >
          boton google
        </button>
      </div> */}
      {/* <div
        style={
          loginVisible
            ? { display: "flex", transition: "400ms" }
            : { display: "none", transition: "400ms" }
        }
        className={styles.overlay}
        onClick={handleLoginClick}
      ></div> */}
      <img src={logo} alt="logo" />
    </div>
  );
}
