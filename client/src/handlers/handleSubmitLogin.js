import { createUserWithMail, singUpWithMail } from "../utils/firebaseConfig";
import { createNewClient, getClient } from "../request/clients";
import { setUserInfoAction } from "../redux/actions";

const handleSubmitLogin = async (e, dispatch, setUserInfo, creatingAccount, setCreatedUser, navigate) => {
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
            console.log(response);
            const createUser = {
                fullName: name,
                email: email,
                password: response.user.reloadUserInfo.passwordHash,
            };

            // corroboramos que el usuario no exista en la base de datos
            const oldUser = await getClient(createUser.email);
            console.log(createUser);
            if (oldUser.data.fullName) throw Error("User alredy exists in database")

            // crea el usuario en la base de datos
            const userCreated = await createNewClient(createUser);
            console.log(userCreated);
            dispatch(
                setUserInfoAction({
                    id: userCreated.data.id,
                    name: userCreated.data.fullName,
                })
            );

            // setea el estado Created User para disparar el mensaje de éxito
            setCreatedUser(true)
        } else {
            // se loguea en firebase
            const response = await singUpWithMail(email, password);

            const createUser = {
                fullName: name,
                email: email,
                password: response.user.reloadUserInfo.passwordHash,
            };

            // trae la info del usuario de la base de datos
            const userCreated = await getClient(createUser.email);
            // envía esa info al estado global
            dispatch(
                setUserInfoAction({
                    id: userCreated.data.id,
                    name: userCreated.data.fullName,
                })
            );
        }
        navigate("/home")
    } catch (error) {
        // mensajes de error personalizados
        const userNotFound = "Firebase: Error (auth/user-not-found)."
        const emailInUse = "Firebase: Error (auth/email-already-in-use)."
        const emailInDb = "User alredy exists in database"
        if (error.message.includes(userNotFound)) {
            window.alert("User not found")
        } else if (error.message.includes(emailInUse) || error.message.includes(emailInDb)) {
            window.alert("User alredy exists")
        } else window.alert("An error has ocurred")
        console.log(error.message)
    }
};

export default handleSubmitLogin;