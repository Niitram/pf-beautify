export default function validateCreateService(serviceInfo, setErrors) {
  //! regex del nombre
  const regexString = /^(?!\s)[a-zA-Z0-9][a-zA-Z0-9\s]*$/;
  if (!serviceInfo.name) {
    setErrors((prevState) => {
      return { ...prevState, name: "Required" };
    });
  }
  if (serviceInfo.name) {
    if (!regexString.test(serviceInfo.fullname)) {
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
  if (!serviceInfo.image) {
    setErrors((prevState) => {
      return { ...prevState, image: "Required" };
    });
  }
  if (serviceInfo.image) {
    if (!regexUrlImage.test(serviceInfo.image)) {
      setErrors((prevState) => {
        return { ...prevState, image: "Invalid" };
      });
    } else {
      setErrors((prevState) => {
        return { ...prevState, image: "" };
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
