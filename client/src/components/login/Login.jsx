import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useToggle from "../../hooks/useToggle";
import { googleProvider } from "../../utils/firebaseConfig";
import ErrorInputMessage from "../../components/errorInputMessage/ErrorInputMessage";
import handleSubmitLogin from "../../handlers/handleSubmitLogin";
import { getAuth, signInWithRedirect } from "firebase/auth";
import validateCreateUser from "../../utils/validateCreateUser";
import styles from "../../views/landing/Landing.module.css";

const Login = ({ loginVisible }) => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createdUser, setCreatedUser] = useToggle(false);
  const [creatingAccount, setCreatingAccount] = useToggle(false);

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
            <ErrorInputMessage
              errors={errors.password}
              text={errors.password}
            />
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
    </>
  );
};

export default Login;
