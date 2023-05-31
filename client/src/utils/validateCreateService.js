export default function validateCreateService(serviceInfo, setErrors) {
  //! regex del nombre
  const regexString =
    /^(?!\s)[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ][a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]*$/;

  if (!serviceInfo.name) {
    setErrors((prevState) => {
      return { ...prevState, name: "Required" };
    });
  }
  if (serviceInfo.name) {
    if (!regexString.test(serviceInfo.name)) {
      setErrors((prevState) => {
        return { ...prevState, name: "Invalid" };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, name: "" };
      });
    }
  }

  //! regex descripcion
  const regexDescription = /^.{20,}$/;
  if (!serviceInfo.description) {
    setErrors((prevState) => {
      return { ...prevState, description: "Required" };
    });
  }
  if (serviceInfo.description) {
    if (!regexDescription.test(serviceInfo.description)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          description: "Description should have at least 20 characters",
        };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, description: "" };
      });
    }
  }

  //! regex image
  const regexUrlImage = /(https?:\/\/.*\.(?:png|jpg|jpeg))/;
  if (!serviceInfo.imageService) {
    setErrors((prevState) => {
      return { ...prevState, imageService: "Required" };
    });
  }
  if (serviceInfo.imageService) {
    if (!regexUrlImage.test(serviceInfo.imageService)) {
      setErrors((prevState) => {
        return { ...prevState, imageService: "Invalid" };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, imageService: "" };
      });
    }
  }

  if (!serviceInfo.price) {
    setErrors((prevState) => {
      return { ...prevState, price: "Required" };
    });
  }
  if (serviceInfo.price) {
    if (serviceInfo.price < 1) {
      setErrors((prevState) => {
        return { ...prevState, price: "Must be higher than 1" };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, price: "" };
      });
    }
  }
}
