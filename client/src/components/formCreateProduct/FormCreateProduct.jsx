import { useState } from "react";
import validateCreateProduct from "../../utils/validateCreateProduct";
import { createProduct } from "../../request/product";

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

  const handleInputChange = (e) => {
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
  const handleSubmitCreate = async (e) => {
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
        console.log(productData);
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
  return (
    <form
      onSubmit={(e) => {
        handleSubmitCreate(e);
      }}
    >
      <label htmlFor="name">Name</label>
      <input
        value={productData.name}
        placeholder="nails..."
        onChange={(e) => {
          handleInputChange(e);
        }}
        type="text"
        id="name-input"
        name="name"
      />
      {errors.name && <div>{errors.name}</div>}

      <label htmlFor="description">Description</label>
      <input
        value={productData.description}
        placeholder="Nice product..."
        onChange={(e) => {
          handleInputChange(e);
        }}
        type="text"
        id="description-input"
        name="description"
      />
      {errors.description && <div>{errors.description}</div>}
      <label htmlFor="image">Image</label>
      <input
        value={productData.image}
        placeholder="https://image.png"
        onChange={(e) => {
          handleInputChange(e);
        }}
        type="text"
        id="image-input"
        name="image"
      />
      {errors.image && <div>{errors.image}</div>}
      <label htmlFor="price">Price</label>
      <input
        value={productData.price}
        placeholder="$123"
        onChange={(e) => {
          handleInputChange(e);
        }}
        type="number"
        id="price-input"
        name="price"
      />
      {errors.price && <div>{errors.price}</div>}
      <label htmlFor="stock">Stock</label>
      <input
        value={productData.stock}
        placeholder="123"
        onChange={(e) => {
          handleInputChange(e);
        }}
        type="number"
        id="stock-input"
        name="stock"
      />
      {errors.stock && <div>{errors.stock}</div>}
      <label htmlFor="category">Category</label>
      <input
        value={productData.category}
        placeholder="lotions..."
        onChange={(e) => {
          handleInputChange(e);
        }}
        type="text"
        id="category-input"
        name="category"
      />
      {errors.category && <div>{errors.category}</div>}
      <label htmlFor="state">State</label>
      <input
        value={productData.state}
        placeholder="true"
        onChange={(e) => {
          handleInputChange(e);
        }}
        type="text"
        id="state-input"
        name="state"
      />
      {errors.state && <div>{errors.state}</div>}
      <button type="submit">Create</button>
    </form>
  );
}

export default FormCreateProduct;
