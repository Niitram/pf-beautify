import { createProduct } from "../request/product";
import validateCreateProduct from "../utils/validateCreateProduct";

const handleSubmitCreate = async (e, productData, setErrors, errors, setProductData) => {
    e.preventDefault();
    validateCreateProduct(
        {
            ...productData,
            [e.target.name]: e.target.value,
        },
        setErrors
    );
    if (
        !errors.name &&
        !errors.description &&
        !errors.image &&
        !errors.price &&
        !errors.discount &&
        !errors.stock &&
        !errors.state &&
        !errors.category
    ) {
        try {
            const response = await createProduct(productData);
            setProductData({
                name: "",
                description: "",
                image: "",
                price: 0,
                discount: 0,
                stock: 0,
                state: "",
                category: "",
            });
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    }
};

export default handleSubmitCreate;