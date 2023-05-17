import { createUserWithMail, singUpWithMail } from "../utils/firebaseConfig";
import { createNewClient, getClient } from "../request/clients";
import { setUserInfoAction } from "../redux/actions";
import { CLIENT } from "../utils/roles";

const handleSubmitLogin = async (
  e,
  dispatch,
  setUserInfo,
  creatingAccount,
  setCreatedUser,
  navigate
) => {
  e.preventDefault();
  const name = e.target.name.value;
  const password = e.target.password.value;
  const email = e.target.email.value;
  setUserInfo({ name: "", password: "", email: "" });
  try {
    // distinga si estamos creando una cuenta o haciendo el login
    if (creatingAccount) {
      //* creamos el usuario en firebase
      const response = await createUserWithMail(email, password);
      const createUser = {
        fullName: name,
        email: email,
        password: response.user.reloadUserInfo.passwordHash,
      };

      // corroboramos que el usuario no exista en la base de datos
      const oldUser = await getClient(createUser.email);
      if (oldUser) throw Error("User alredy exists in database");

      // crea el usuario en la base de datos
      const userCreated = await createNewClient(createUser);
      dispatch(
        setUserInfoAction({
          id: userCreated.data.id,
          name: userCreated.data.fullName,
          rol: CLIENT,
        })
      );

      // setea el estado Created User para disparar el mensaje de éxito
      setCreatedUser(true);
    } else {
      // se loguea en firebase
      await singUpWithMail(email, password);

      // trae la info del usuario de la base de datos
      const userCreated = await getClient(email);
      // envía esa info al estado global
      dispatch(
        setUserInfoAction({
          id: userCreated.data.id,
          name: userCreated.data.fullName,
          rol: CLIENT,
        })
      );
    }
    navigate("/home");
  } catch (error) {
    // mensajes de error personalizados
    const ingresaConGooglePelotudo = "Firebase: Error (auth/wrong-password).";
    const userNotFound = "Firebase: Error (auth/user-not-found).";
    const emailInUse = "Firebase: Error (auth/email-already-in-use).";
    const emailInDb = "User alredy exists in database";
    if (error.message.includes(userNotFound)) {
      window.alert("User not found");
    } else if (
      error.message.includes(emailInUse) ||
      error.message.includes(emailInDb)
    ) {
      window.alert("User alredy exists");
    } else if (error.message.includes(ingresaConGooglePelotudo)) {
      window.alert("Wrong data. Try loging in with google");
    } else window.alert("An error has ocurred");
    console.log(error.message);
  }
};

export default handleSubmitLogin;

