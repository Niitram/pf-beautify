import logo from "../../assets/images/LandingImg.svg";
import styles from "./Landing.module.css";
import useToggle from "../../hooks/useToggle";
import { useState } from "react";
import { useDispatch } from "react-redux";
import handleSubmitLogin from "../../handlers/handleSubmitLogin";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
// import { googleProvider, firebaseApp } from "../../utils/firebaseConfig";
// import { signInWithRedirect, getAuth } from "firebase/auth";

export default function Landing() {
  const navigate = useNavigate();
  const [loginVisible, setLoginVisible] = useToggle(false);
  const [creatingAccount, setCreatingAccount] = useToggle(false);
  const [createdUser, setCreatedUser] = useToggle(false);
  const dispatch = useDispatch();
  // const auth = getAuth(firebaseApp);

  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUserInfo({ ...userInfo, [property]: value });
  };

  const handleLoginClick = () => {
    setLoginVisible(!loginVisible);
  };

  // const loginWithGoogle = async () => {
  //   try {
  //     signInWithRedirect(auth, googleProvider);
  //   } catch (error) {
  //     window.alert(error.message);
  //     console.log(error.message);
  //   }
  // };
  return (
    <form
      onSubmit={(e) => {
        handleSubmitLogin(
          e,
          dispatch,
          setUserInfo,
          creatingAccount,
          setCreatedUser,
          navigate
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
          Login
        </button>
      </div>
      <div
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
          <input
            value={userInfo.name}
            type="text"
            name="name"
            placeholder="Name"
            className="Username"
            onChange={handleChange}
          />
          <input
            value={userInfo.email}
            type="text"
            name="email"
            placeholder="email@example.com"
            className="Username"
            onChange={handleChange}
          />
          <input
            value={userInfo.password}
            type="text"
            name="password"
            placeholder="Password"
            className="Password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.BotonLogin}>
          {creatingAccount ? "Register" : "Login"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setCreatingAccount(!creatingAccount);
          }}
        >
          {creatingAccount
            ? "You are already a member"
            : "You are not a member"}
        </button>

        <hr></hr>
        <button
          onClick={(e) => {
            e.preventDefault();
            // loginWithGoogle();
          }}
        >
          Google
        </button>
      </div>
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
