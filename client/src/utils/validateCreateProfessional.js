const validateCreateProfessional = (professionalInfo, setErrors) => {
  //! ---- regex del nombre
  const regexString =
    /^(?!\s)[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ][a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]*$/;
  if (!professionalInfo.fullname) {
    setErrors((prevState) => {
      return { ...prevState, fullname: "Required" };
    });
  }
  if (professionalInfo.fullname) {
    if (!regexString.test(professionalInfo.fullname)) {
      setErrors((prevState) => {
        return { ...prevState, fullname: "Invalid" };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, fullname: "" };
      });
    }
  }

  //! ------ regex de la address(la misma que  el del string)
  if (!professionalInfo.direction) {
    setErrors((prevState) => {
      return { ...prevState, direction: "Required" };
    });
  }
  if (professionalInfo.direction) {
    if (!regexString.test(professionalInfo.direction)) {
      setErrors((prevState) => {
        return { ...prevState, direction: "Invalid" };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, direction: "" };
      });
    }
  }

  //! ------ regex de la imagen
  const regexUrlImage = /(https?:\/\/.*\.(?:png|jpg|jpeg))/;
  if (!professionalInfo.image) {
    setErrors((prevState) => {
      return { ...prevState, image: "Required" };
    });
  }
  if (professionalInfo.imageProfessional) {
    if (!regexUrlImage.test(professionalInfo.imageProfessional)) {
      setErrors((prevState) => {
        return { ...prevState, imageProfessional: "Invalid" };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, imageProfessional: "" };
      });
    }
  }

  //! ---- regex del mail
  const regexMail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!professionalInfo.mail) {
    setErrors((prevState) => {
      return { ...prevState, mail: "Required" };
    });
  }
  if (professionalInfo.mail) {
    if (!regexMail.test(professionalInfo.mail)) {
      setErrors((prevState) => {
        return { ...prevState, mail: "Invalid" };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, mail: "" };
      });
    }
  }
};

export default validateCreateProfessional;
