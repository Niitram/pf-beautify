export const validateUpdateProduct = (product, setErrors) => {
  const regexString =
    /^(?!\s)[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ][a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]*$/;

  if (!product.name)
    setErrors((prevState) => {
      return { ...prevState, name: "" };
    });
  if (product.name) {
    if (!regexString.test(product.name)) {
      setErrors((prevState) => {
        return { ...prevState, name: "Invalid" };
      });
    } else
      setErrors((prevState) => {
        return { ...prevState, name: "" };
      });
  }

  const regexNumber = /^\d+(.\d+)?$/;
  if (!product.price)
    setErrors((prevState) => {
      return { ...prevState, price: "" };
    });
  if (product.price) {
    if (!regexNumber.test(product.price) || product.price <= 0) {
      setErrors((prevState) => {
        return { ...prevState, price: "Invalid" };
      });
    } else
      setErrors((prevState) => {
        return { ...prevState, price: "" };
      });
  }

  if (!product.discount || product.discount < 0)
    setErrors((prevState) => {
      return { ...prevState, discount: "" };
    });
  if (product.discount) {
    if (!regexNumber.test(product.discount)) {
      setErrors((prevState) => {
        return { ...prevState, discount: "Invalid" };
      });
    } else
      setErrors((prevState) => {
        return { ...prevState, discount: "" };
      });
  }

  const regexStock = /^(0|[1-9]\d*)$/;
  if (!product.stock)
    setErrors((prevState) => {
      return { ...prevState, stock: "" };
    });
  if (product.stock) {
    if (!regexStock.test(product.stock)) {
      setErrors((prevState) => {
        return { ...prevState, stock: "Invalid" };
      });
    } else
      setErrors((prevState) => {
        return { ...prevState, stock: "" };
      });
  }
};
