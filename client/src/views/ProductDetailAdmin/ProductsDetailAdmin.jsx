import { useParams, useNavigate } from "react-router";
import styles from "./ProductDetailAdmin.module.css";
import { useEffect, useState } from "react";
import {
  getProductById,
  getProducts,
  updateProduct,
} from "../../request/product";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Skeleton } from "@mui/material";
import paleta from "../../assets/images/Paleta";
import CheckIcon from "@mui/icons-material/Check";
import filterEmpty from "../../utils/FilterEmptyProps";
import axios from "axios";
import { getAllProducts } from "../../redux/actions";
import { validateUpdateProduct } from "../../utils/validateUpdateProduct";

export default function ProductDetailAdmin() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id).then(({ data }) => setProduct(data));
  }, []);

  const handleClick = async () => {
    if (editMode) {
      if (errors.name && errors.stock && errors.price && errors.discount)
        return;
      const modifiedProduct = filterEmpty(editedData);
      await updateProduct(id, modifiedProduct);
      getAllProducts(await getProducts().data);
      setEditMode(!editMode);
      navigate(`/dashboardAdmin/products_control/`);
    } else {
      setEditMode(!editMode);
    }
  };

  const [editedData, setEditedData] = useState({
    name: "",
    stock: "",
    price: "",
    discount: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    stock: "",
    price: "",
    discount: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const property = e.target.name;
    const value = e.target.value;
    setEditedData({ ...editedData, [property]: value });
    validateUpdateProduct({ ...editedData, [property]: value }, setErrors);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <IconButton onClick={handleClick}>
          {!editMode ? (
            <EditIcon style={{ fill: paleta.accent1 }} />
          ) : (
            <CheckIcon style={{ fill: paleta.accent1 }} />
          )}
        </IconButton>
        <div className={styles.titulo}>
          <h1>Product #{product.id}</h1>
          {editMode ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder={product.name}
                name="name"
                value={editedData.name}
                onChange={(e) => handleChange(e)}
              />
              <span
                style={errors.name ? { opacity: 1 } : { opacity: 0 }}
                className={styles.error}
              >
                Invalid
              </span>
            </div>
          ) : (
            <h3>{product.name}</h3>
          )}
        </div>
        <div className={styles.important}>
          <div className={styles.dataImportante}>
            <h1>Stock</h1>
            {editMode ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  type="number"
                  step={1}
                  placeholder={product.stock}
                  name="stock"
                  value={editedData.stock}
                  onChange={(e) => handleChange(e)}
                />
                <span
                  style={errors.stock ? { opacity: 1 } : { opacity: 0 }}
                  className={styles.error}
                >
                  Invalid
                </span>
              </div>
            ) : (
              <h3
                style={
                  product.stock < 10 ? { color: "red" } : { color: "green" }
                }
              >
                {product.stock}
              </h3>
            )}
          </div>
          <div className={styles.dataImportante}>
            <h1>Price</h1>
            {editMode ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  placeholder={product.price}
                  name="price"
                  value={editedData.price}
                  onChange={(e) => handleChange(e)}
                />
                <span
                  style={errors.price ? { opacity: 1 } : { opacity: 0 }}
                  className={styles.error}
                >
                  Invalid
                </span>
              </div>
            ) : (
              <h3>${product.price}</h3>
            )}
          </div>
        </div>
        <div className={styles.otro}>
          <div className={styles.otraData}>
            <h1>Discount</h1>
            {editMode ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  placeholder={
                    product.discount ? `${product.discount}%` : "none"
                  }
                  name="discount"
                  value={editedData.discount}
                  onChange={(e) => handleChange(e)}
                />
                <span
                  style={errors.discount ? { opacity: 1 } : { opacity: 0 }}
                  className={styles.error}
                >
                  Invalid
                </span>
              </div>
            ) : (
              <h3>{product.discount ? `${product.discount}%` : "none"}</h3>
            )}
          </div>
          <div className={styles.otraData}>
            <h1>Rate</h1>
            <h3>{product && product.rate && product.rate.toFixed(2)}</h3>
          </div>
        </div>
        <h1>Gallery:</h1>
        {product.image ? (
          <img
            style={{ width: "10rem" }}
            src={product.image}
            alt={product.name}
          />
        ) : (
          <Skeleton width={"10rem"} />
        )}
      </div>
    </div>
  );
}
