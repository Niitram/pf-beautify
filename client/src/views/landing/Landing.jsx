import logo from "../../assets/images/LandingImg.svg";
import styles from "./Landing.module.css";

import useToggle from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import Login from "../../components/login/Login";

export default function Landing() {
  const navigate = useNavigate();
  const [loginVisible, setLoginVisible] = useToggle(false);


  const handleLoginClick = () => {
    setLoginVisible(!loginVisible);
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmitLogin(
          e,
          dispatch,
          setUserInfo,
          creatingAccount,
          setCreatedUser
        );
      }}
      className={styles.Container}
    >
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


      {loginVisible && <Login loginVisible={loginVisible} />}

      <div
        style={
          loginVisible
            ? { display: "flex", transition: "400ms" }
            : { display: "none", transition: "400ms" }
        }
        className={styles.overlay}
        onClick={handleLoginClick}
      ></div>
      <img src={logo} alt="logo" />
      {createdUser && (
        <Stack
          sx={{ width: "300px", position: "absolute", bottom: 10, right: 10 }}
          spacing={2}
        >
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            User <strong>created</strong>
          </Alert>
        </Stack>
      )}
    </form>
  );
}
