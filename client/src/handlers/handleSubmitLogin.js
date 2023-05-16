import { createUserWithMail, singUpWithMail } from "../utils/firebaseConfig";
import { createNewClient } from "../request/clients";
import { setUserInfoAction } from "../redux/actions";

const handleSubmitLogin = async (e, dispatch, setUserInfo, creatingAccount, setCreatedUser) => {
    e.preventDefault();
    const name = e.target.name.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    setUserInfo({ name: "", password: "", email: "" });

    try {
        if (creatingAccount) {
            const response = await createUserWithMail(email, password);
            const createUser = {
                fullName: name,
                email: email,
                password: response.user.reloadUserInfo.passwordHash,
            };

            const userCreated = await createNewClient(createUser);
            dispatch(
                setUserInfoAction({
                    id: userCreated.data.id,
                    name: userCreated.data.fullName,
                })
            );
            setCreatedUser(true)
        } else await singUpWithMail(email, password);
    } catch (error) {
        window.alert("An error has ocurred")
        console.log(error.message)
    }
};

export default handleSubmitLogin;