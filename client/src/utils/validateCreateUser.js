const regexString =
  /^(?!\s)[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ][a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]*$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;

const validateCreateUser = ({ email, password, name }, creatingAccount) => {
  const errors = { email: "", password: "", name: "" };

  if (creatingAccount && !name.match(regexString))
    errors.name = "Name required";

  if (!email.match(regexEmail)) errors.email = "Invalid email";
  if (!email.length) errors.email = "Email required";

  if (password.length < 6)
    errors.password = "Password must have at least 6 characters";

  return errors;
};

export default validateCreateUser;
