import { createProduct } from "../request/product";
import validateCreateProduct from "../utils/validateCreateProduct";

const handleSubmitCreate = async (e, productData, setErrors, errors, setProductData, setCreated, setIdProduct) => {
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
        !errors.category
    ) {
        try {
            const response = await createProduct(productData);
            if (response.request.status === 201) {
                setCreated(true)
                setIdProduct(response.data.id)
            }
            setProductData({
                name: "",
                description: "",
                image: "",
                price: 0,
                discount: 0,
                stock: 0,
                rate: 1,
                state: "true",
                category: "",
            });
        } catch (error) {
            console.log(error.message);
        }
    }
};

export default handleSubmitCreate;