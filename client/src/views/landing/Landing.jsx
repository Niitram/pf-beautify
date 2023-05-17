import logo from "../../assets/images/LandingImg.svg";
import styles from "./Landing.module.css";
import useToggle from "../../hooks/useToggle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import handleSubmitLogin from "../../handlers/handleSubmitLogin";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import {
  googleProvider,
  firebaseApp,
  loginWithGoogleFirebase,
} from "../../utils/firebaseConfig";
import { signInWithRedirect, getAuth, onAuthStateChanged } from "firebase/auth";
import { CLIENT } from "../../utils/roles";
import validateCreateUser from "../../utils/validateCreateUser";
import ErrorInputMessage from "../../components/errorInputMessage/ErrorInputMessage";
import { postFindOrCreate } from "../../request/clients";
import { setUserInfoAction } from "../../redux/actions";
const auth = getAuth(firebaseApp);

const loginWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    window.alert(error.message);
    console.log(error.message);
  }
};

export default function Landing() {
  const navigate = useNavigate();
  const userRedux = useSelector((state) => state.userData);
  const [loginVisible, setLoginVisible] = useToggle(false);
  const [creatingAccount, setCreatingAccount] = useToggle(false);
  const [createdUser, setCreatedUser] = useToggle(false);
  const [logout, setLogout] = useToggle(true);
  const [errors, setErrors] = useState({
    email: "Email required",
    password: "Password required",
    name: "",
  });
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUserInfo({ ...userInfo, [property]: value });
    setErrors(
      validateCreateUser({ ...userInfo, [property]: value }, creatingAccount)
    );
  };

  const handleLoginClick = () => {
    setLoginVisible(!loginVisible);
  };

  onAuthStateChanged(auth, async (usuarioFirebase) => {
    // las tres condiciones: hubo un cambio en la auth, el usuario recibido es de google, antes no había usuario logueado
    if (usuarioFirebase && usuarioFirebase.displayName && logout) {
      await loginWithGoogleFirebase(usuarioFirebase, dispatch, navigate);
    } else if (!logout) setLogout(true);
  });

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
          {creatingAccount && (
            <input
              value={userInfo.name}
              type="text"
              name="name"
              placeholder="Name"
              className="Username"
              onChange={handleChange}
            />
          )}
          <ErrorInputMessage errors={errors.email} text={errors.name} />
          <input
            value={userInfo.email}
            type="text"
            name="email"
            placeholder="email@example.com"
            className="Username"
            onChange={handleChange}
          />
          <ErrorInputMessage errors={errors.email} text={errors.email} />
          <input
            value={userInfo.password}
            type="text"
            name="password"
            placeholder="Password"
            className="Password"
            onChange={handleChange}
          />
          <ErrorInputMessage errors={errors.password} text={errors.password} />
        </div>
        <button
          disabled={errors.email && errors.password}
          type="submit"
          className={styles.BotonLogin}
        >
          {creatingAccount ? "Register" : "Login"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            !creatingAccount
              ? setErrors({ ...errors, name: "Name required" })
              : "";
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
            loginWithGoogle();
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
