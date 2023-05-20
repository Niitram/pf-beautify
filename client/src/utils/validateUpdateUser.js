const regexUrlImage = /(https?:\/\/.*\.(?:png|jpg|jpeg))/;

export const validateUpdateUser = (user, visibleInputs) => {
  const errors = {
    name: "",
    adress: "",
    phone: "",
    image: "",
  };
  if (visibleInputs.name && (user.name.length > 255 || !user.name.length))
    errors.name = true;
  if (visibleInputs.adress && (user.adress.length > 255 || !user.adress.length))
    errors.adress = true;
  if (visibleInputs.phone && (user.phone.length > 15 || !user.phone.length))
    errors.phone = true;
  if (visibleInputs.image) {
    if (!user.image.length) errors.image = true;
    if (!user.image.match(regexUrlImage)) errors.image = true;
    if (user.image.length > 255) errors.image = true;
  }

  return errors;
};

export const anyErrors = (errors) => {
  for (const error in errors) {
    if (errors[error]) return true;
  }
  return false;
};
