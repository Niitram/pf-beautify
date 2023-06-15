import { createUserWithMail, singUpWithMail } from "../utils/firebaseConfig";
import { createNewClient, getClient } from "../request/clients";
import { getCart } from "../request/cart";
import { setUserInfoAction, showError } from "../redux/actions";
import { ADMIN, CLIENT } from "../utils/roles";

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

  handleLoginClick();

  const oldLocation = location.pathname;
  navigate("/loading");

  const name = userInfo.name;
  const password = userInfo.password;
  const email = userInfo.email;

  setUserInfo({ name: "", password: "", email: "" });
  try {
    // distinga si estamos creando una cuenta o haciendo el login
    if (creatingAccount) {
      setCreatingAccount(false);

      //* creamos el usuario en firebase
      await createUserWithMail(email, password);
      const createUser = {
        fullName: name,
        email: email,
      };

      // crea el usuario en la base de datos
      const userCreated = await createNewClient(createUser);

      const userData = {
        id: userCreated.data.id,
        name: userCreated.data.fullName,
        email: createUser.email,
        rol: CLIENT,
      };
      if (
        userData.email === "beautifyfinalproyect@gmail.com" ||
        userData.email === "BeautifyStaff@hotmail.com"
      )
        userData.rol = ADMIN;

      //Guarda el el local la info del usuario creado e inicializa el carrito
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("cart", JSON.stringify([]));

      dispatch(setUserInfoAction(userData));
    } else {
      // se loguea en firebase
      await singUpWithMail(email, password);

      // trae la info del usuario y de su carrito de la base de datos
      const userCreated = await getClient(email);
      // const cartSaved = await getCart(userCreated.data.id); //*el back si no tiene un carrito devuelve undefined
      // const userCart = !cartSaved ? [] : cartSaved.data

      // si el usuario está baneado lo manda pa su casa
      if (userCreated.data.banned) {
        navigate("/");
        return dispatch(
          showError({
            tittle: "Banned-user",
            message: "Sory, looks like you've been banned",
          })
        );
      }

      const userData = {
        id: userCreated.data.id,
        name: userCreated.data.fullName,
        email: email,
        rol: CLIENT,
      };

      //Guarda el el local la info del usuario y del carrito
      if (
        userData.email === "beautifyfinalproyect@gmail.com" ||
        userData.email === "BeautifyStaff@hotmail.com"
      ) {
        userData.rol = ADMIN;
      }

      localStorage.setItem("userData", JSON.stringify(userData));
      const cartSaved = await getCart(userData.id);
      localStorage.setItem("cart", JSON.stringify(cartSaved.data));

      // envía esa info del usuario al estado global
      dispatch(setUserInfoAction(userData));
    }
    if (
      email === "beautifyfinalproyect@gmail.com" ||
      email === "BeautifyStaff@hotmail.com"
    )
      return navigate("/dashboardAdmin");
    if (oldLocation === "/") navigate("/home");
    else navigate(oldLocation);
  } catch (error) {
    navigate(oldLocation);
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
