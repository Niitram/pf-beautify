import { useEffect, useState } from "react";
import validateCreateProduct from "../../utils/validateCreateProduct";
import styles from "./FormCreateProduct.module.css";
import ErrorInputMessage from "../errorInputMessage/ErrorInputMessage";
import InputForm from "../inputForm/InputForm";
import handleInputChange from "../../handlers/handleInputChange";
import handleSubmitCreate from "../../handlers/handleSubmitCreate";
import useToggle from "../../hooks/useToggle";
import { Link } from "react-router-dom";
import cameraIcon from "../../assets/images/camera-icon.png";
import { useDispatch } from "react-redux";
import InputImage from "../inputImage/inputImage";
import DragImage from "../dragImage/DragImage";

function FormCreateProduct() {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
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
  const [errors, setErrors] = useState({
    name: "*",
    description: "*",
    image: "*",
    price: "*",
    discount: "",
    stock: "*",
    rate: "",
    state: "",
    category: "*",
  });
  const [idProduct, setIdProduct] = useState("");
  const [created, setCreated] = useToggle(false);
  useEffect(() => {
    return () => {
      setCreated(false);
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
      setErrors({
        name: "*",
        description: "*",
        image: "*",
        price: "*",
        discount: "",
        stock: "*",
        rate: "",
        state: "",
        category: "*",
      });
    };
  }, [setCreated]);
  const handlerReset = () => {
    setCreated(false);
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
    setErrors({
      name: "*",
      description: "*",
      image: "*",
      price: "*",
      discount: "",
      stock: "*",
      rate: "",
      state: "",
      category: "*",
    });
  };

  return (
    <div className={styles.containerGlobal}>
      <form
        className={styles.formCreateProduct}
        onSubmit={(e) => {
          handleSubmitCreate(
            e,
            productData,
            setErrors,
            errors,
            setProductData,
            setCreated,
            setIdProduct,
            dispatch
          );
        }}
      >
        <h1>
          Add <label>Product</label>
        </h1>
        <div className={styles.containerInputs}>
          {/* <label htmlFor="name">Name</label> */}
          <InputForm
            placeholder="Name"
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
          {/* <label htmlFor="description">Description</label> */}
          <InputForm
            placeholder="Description"
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
          {/* <label htmlFor="image">Image</label> */}
          {/* <InputForm
            placeholder="Image"
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
          /> */}
          <InputImage
            name="image"
            setProductData={setProductData}
            productData={productData}
            setErrors={setErrors}
          />
          <ErrorInputMessage errors={errors.image} text={errors.image} />
        </div>
        <div className={styles.priceAndStock}>
          <div className={styles.containerInputs}>
            <label htmlFor="price">Price</label>
            <InputForm
              placeholder="Price"
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
        </div>
        <div className={styles.containerInputs}>
          {/* <label htmlFor="category">Category</label> */}
          <InputForm
            placeholder="Category"
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
        <div className={styles.btnCreate}>
          <button type="submit" disabled={created}>
            Create
          </button>
          {created && (
            <Link
              style={{ textDecoration: "none" }}
              to={`/detailProduct/${idProduct}`}
            >
              <button>View product</button>
            </Link>
          )}
          {created && (
            <button onClick={handlerReset}>Create another product</button>
          )}
        </div>
      </form>
      <div className={styles.preview}>
        <DragImage
          productData={productData}
          errors={errors}
          cameraIcon={cameraIcon}
          setProductData={setProductData}
          setErrors={setErrors}
        />
      </div>
    </div>
  );
}

export default FormCreateProduct;
