import { createUserWithMail, singUpWithMail } from "../utils/firebaseConfig";
import { createNewClient, getClient } from "../request/clients";
import { setUserInfoAction, showError } from "../redux/actions";
import { CLIENT } from "../utils/roles";

const handleSubmitLogin = async (
  e,
  dispatch,
  setUserInfo,
  creatingAccount,
  navigate,
  location,
  handleLoginClick,
  setCreatingAccount,
  userInfo
) => {
  e.preventDefault();
  const name = userInfo.name;
  const password = userInfo.password;
  const email = userInfo.email;

  setUserInfo({ name: "", password: "", email: "" });
  try {
    // distinga si estamos creando una cuenta o haciendo el login
    if (creatingAccount) {
      //* creamos el usuario en firebase
      await createUserWithMail(email, password);
      const createUser = {
        fullName: name,
        email: email,
        // password: response.user.reloadUserInfo.passwordHash,
      };

      // corroboramos que el usuario no exista en la base de datos
      // const oldUser = await getClient(createUser.email);
      // if (oldUser) throw Error("User alredy exists in database");

      // crea el usuario en la base de datos
      const userCreated = await createNewClient(createUser);

      const userData = {
        id: userCreated.data.id,
        name: userCreated.data.fullName,
        email: createUser.email,
        rol: CLIENT,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      JSON.parse(localStorage.getItem("userData"));

      dispatch(setUserInfoAction(userData));

      // handleLoginClick();
      if (location.pathname === "/") navigate("/home");
      setCreatingAccount(false);
    } else {
      // se loguea en firebase
      await singUpWithMail(email, password);

      // trae la info del usuario de la base de datos
      const userCreated = await getClient(email);

      const userData = {
        id: userCreated.data.id,
        name: userCreated.data.fullName,
        email: email,
        rol: CLIENT,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      JSON.parse(localStorage.getItem("userData"));

      // envía esa info al estado global
      dispatch(setUserInfoAction(userData));
    }
    handleLoginClick();
    if (location.pathname === "/") navigate("/home");
  } catch (error) {
    // mensajes de error personalizados
    const ingresaConGooglePelotudo = "Firebase: Error (auth/wrong-password).";
    const userNotFound = "Firebase: Error (auth/user-not-found).";
    const emailInUse = "Firebase: Error (auth/email-already-in-use).";
    const emailInDb = "User alredy exists in database";
    if (error.message.includes(userNotFound)) {
      dispatch(showError({ tittle: "Wrong-user", message: "User not found" }));
    } else if (
      error.message.includes(emailInUse) ||
      error.message.includes(emailInDb)
    ) {
      dispatch(
        showError({ tittle: "Wrong-user", message: "User alredy exists" })
      );
    } else if (error.message.includes(ingresaConGooglePelotudo)) {
      dispatch(
        showError({
          tittle: "Wrong-password",
          message: "Wrong data. Try loging in with google or another account",
        })
      );
    } else
      dispatch(
        showError({
          tittle: "An error has ocurred",
          message: "Please try again",
        })
      );

    console.log(error.message);
  }
};

export default handleSubmitLogin;
