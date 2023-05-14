import { useState } from "react";
import validateCreateProduct from "../../utils/validateCreateProduct";
import styles from "./FormCreateProduct.module.css";
import ErrorInputMessage from "../errorInputMessage/ErrorInputMessage";
import InputForm from "../inputForm/InputForm";
import handleInputChange from "../../handlers/handleInputChange";
import handleSubmitCreate from "../../handlers/handleSubmitCreate";

function FormCreateProduct() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    discount: 0,
    stock: 0,
    rate: 1,
    state: "",
    category: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    discount: "",
    stock: "",
    rate: "",
    state: "",
    category: "",
  });

  return (
    <div>
      <h1>Create product</h1>
      <form
        className={styles.formCreateProduct}
        onSubmit={(e) => {
          handleSubmitCreate(e, productData, setErrors, errors, setProductData);
        }}
      >
        <div className={styles.containerInputs}>
          <label htmlFor="name">Name</label>
          <InputForm
            placeholder="nails..."
            type="text"
            id="name-input"
            name="name"
            value={productData.name}
            handler={(e) => {
              handleInputChange(
                e,
                setProductData,
                validateCreateProduct,
                productData,
                setErrors
              );
            }}
          />
          <ErrorInputMessage errors={errors.name} text={errors.name} />
        </div>

        <div className={styles.containerInputs}>
          <label htmlFor="description">Description</label>
          <InputForm
            placeholder="Nice product..."
            type="text"
            id="description-input"
            name="description"
            value={productData.description}
            handler={(e) => {
              handleInputChange(
                e,
                setProductData,
                validateCreateProduct,
                productData,
                setErrors
              );
            }}
          />
          <ErrorInputMessage
            errors={errors.description}
            text={errors.description}
          />
        </div>

        <div className={styles.containerInputs}>
          <label htmlFor="image">Image</label>
          <InputForm
            placeholder="Nice product..."
            type="text"
            id="image-input"
            name="image"
            value={productData.image}
            handler={(e) => {
              handleInputChange(
                e,
                setProductData,
                validateCreateProduct,
                productData,
                setErrors
              );
            }}
          />
          <ErrorInputMessage errors={errors.image} text={errors.image} />
        </div>

        <div className={styles.containerInputs}>
          <label htmlFor="price">Price</label>
          <InputForm
            placeholder="$12"
            type="number"
            id="price-input"
            name="price"
            value={productData.price}
            handler={(e) => {
              handleInputChange(
                e,
                setProductData,
                validateCreateProduct,
                productData,
                setErrors
              );
            }}
          />
          <ErrorInputMessage errors={errors.price} text={errors.price} />
        </div>

        <div className={styles.containerInputs}>
          <label htmlFor="stock">Stock</label>
          <InputForm
            placeholder="Stock"
            type="number"
            id="stock-input"
            name="stock"
            value={productData.stock}
            handler={(e) => {
              handleInputChange(
                e,
                setProductData,
                validateCreateProduct,
                productData,
                setErrors
              );
            }}
          />
          <ErrorInputMessage errors={errors.stock} text={errors.stock} />
        </div>

        <div className={styles.containerInputs}>
          <label htmlFor="category">Category</label>
          <InputForm
            placeholder="lotion"
            type="text"
            id="category-input"
            name="category"
            value={productData.category}
            handler={(e) => {
              handleInputChange(
                e,
                setProductData,
                validateCreateProduct,
                productData,
                setErrors
              );
            }}
          />
          <ErrorInputMessage errors={errors.category} text={errors.category} />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default FormCreateProduct;
