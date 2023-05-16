const validateCreateProduct = (product, setErrors) => {

    const regexString = /^(?!\s)[a-zA-Z0-9][a-zA-Z0-9\s]*$/;
    if (!product.name)
        setErrors((prevState) => {
            return { ...prevState, name: "Required" };
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

    if (!product.description)
        setErrors((prevState) => {
            return { ...prevState, description: "Required" };
        });
    if (product.description) {
        if (!regexString.test(product.description)) {
            setErrors((prevState) => {
                return { ...prevState, description: "Invalid" };
            });
        } else
            setErrors((prevState) => {
                return { ...prevState, description: "" };
            });
    }

    const regexUrlImage = /(https?:\/\/.*\.(?:png|jpg|jpeg))/;
    if (!product.image)
        setErrors((prevState) => {
            return { ...prevState, image: "Required" };
        });
    if (product.image) {
        if (!regexUrlImage.test(product.image)) {
            setErrors((prevState) => {
                return { ...prevState, image: "Invalid" };
            });
        } else
            setErrors((prevState) => {
                return { ...prevState, image: "" };
            });
    }

    const regexNumber = /^\d+$/;
    if (!product.price)
        setErrors((prevState) => {
            return { ...prevState, price: "Required" };
        });
    if (product.price) {
        if (!regexNumber.test(product.price)) {
            setErrors((prevState) => {
                return { ...prevState, price: "Invalid" };
            });
        } else
            setErrors((prevState) => {
                return { ...prevState, price: "" };
            });
    }

    if (!product.stock)
        setErrors((prevState) => {
            return { ...prevState, stock: "Required" };
        });
    if (product.stock) {
        if (!regexNumber.test(product.stock)) {
            setErrors((prevState) => {
                return { ...prevState, stock: "Invalid" };
            });
        } else
            setErrors((prevState) => {
                return { ...prevState, stock: "" };
            });
    }
    if (!product.category)
        setErrors((prevState) => {
            return { ...prevState, category: "Required" };
        });
    if (product.category) {
        if (!regexString.test(product.category)) {
            setErrors((prevState) => {
                return { ...prevState, category: "Invalid" };
            });
        } else
            setErrors((prevState) => {
                return { ...prevState, category: "" };
            });
    }
};

export default validateCreateProduct;