import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useToggle from "../../hooks/useToggle";
import { googleProvider } from "../../utils/firebaseConfig";
import ErrorInputMessage from "../../components/errorInputMessage/ErrorInputMessage";
import handleSubmitLogin from "../../handlers/handleSubmitLogin";
import { getAuth, signInWithRedirect } from "firebase/auth";
import validateCreateUser from "../../utils/validateCreateUser";
import styles from "../../views/landing/Landing.module.css";

const Login = ({
  loginVisible,
  handleLoginClick,
  creatingAccount,
  setCreatingAccount,
}) => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState({
    email: "Email required",
    password: "Password required",
    name: "",
  });
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

  const loginWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      window.alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <div
        style={
          loginVisible
            ? { display: "flex", transition: "400ms" }
            : { display: "none", transition: "400ms" }
        }
        className={styles.overlay}
        onClick={handleLoginClick}
      ></div>
      <form
        onSubmit={(e) => {
          handleSubmitLogin(
            e,
            dispatch,
            setUserInfo,
            creatingAccount,
            navigate,
            location,
            handleLoginClick
          );
        }}
        className={
          location.pathname !== "/" ? styles.Container : styles.landingContainer
        }
      >
        <div
          className={styles.LoginForm}
          style={
            loginVisible
              ? { display: "flex", transition: "400ms" }
              : { display: "none", transition: "400ms" }
          }
        >
          <button className={styles.closeButton} onClick={handleLoginClick}>
            x
          </button>
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
            <ErrorInputMessage
              errors={errors.password}
              text={errors.password}
            />
          </div>
          <button
            disabled={
              creatingAccount
                ? errors.email || errors.password || errors.name
                : errors.email || errors.password
            }
            type="submit"
            className={styles.BotonLogin}
          >
            {creatingAccount ? "Register" : "Login"}
          </button>
          <button
            className={styles.BotonLogin}
            onClick={(e) => {
              e.preventDefault();
              !creatingAccount
                ? setErrors({
                    ...errors,
                    name: userInfo.name.length ? "" : "Name required",
                  })
                : setErrors({ ...errors, name: "" });
              setCreatingAccount(!creatingAccount);
            }}
          >
            {creatingAccount
              ? "You are already a member?"
              : "You are not a member?"}
          </button>

          <button
            className={styles.BotonLogin}
            onClick={(e) => {
              e.preventDefault();
              loginWithGoogle();
            }}
          >
            Google
          </button>
        </div>
        {/* {createdUser && (
          <Stack
            sx={{ width: "300px", position: "absolute", bottom: 10, right: 10 }}
            spacing={2}
          >
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              User <strong>created</strong>
            </Alert>
          </Stack>
        )} */}
      </form>
    </>
  );
};

export default Login;
