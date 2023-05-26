const handleInputChange = (e, setProductData, validateCreateProduct, productData, setErrors) => {
    let value = e.target.value;
    if (
        e.target.name === "stock" ||
        e.target.name === "price" ||
        e.target.name === "discount" ||
        e.target.name === "rate"
    ) {
        value = Number(value);
    }
    setProductData({
        ...productData,
        [e.target.name]: value,
    });
    validateCreateProduct(
        {
            ...productData,
            [e.target.name]: value,
        },
        setErrors
    );
};

export default handleInputChange;