import { Stack, Rating, Skeleton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./DetailProduct.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../request/product";

function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    try {
      getProductById(id).then((res) => {
        setProduct(res.data);
      });
    } catch (error) {
      console.log(error.message);
    }
    return setProduct({});
  }, [id]);

  const { name, image, description, price, stock, rate, discount } = product;
  return (
    <div className={styles.container}>
      <img className={styles.imgProduct} src={image} alt={name} />
      <div className={styles.containerDetails}>
        {name ? (
          <h1 className={styles.nombreProduct}>{name}</h1>
        ) : (
          <Skeleton height={40} />
        )}
        <h3 className={styles.descripcionProduct}>Description</h3>
        {rate ? (
          <Stack>
            {console.log(rate)}
            <Rating value={rate < 1 ? 1 : rate} precision={0.5} readOnly />
          </Stack>
        ) : (
          <Skeleton />
        )}
        <div className={styles.descripcionProduct}>
          {price ? (
            <h3 className={styles.descuento}>${price}</h3>
          ) : (
            <Skeleton />
          )}
          {discount ? (
            <h3 className={styles.precio}> ${price - discount} </h3>
          ) : (
            <Skeleton />
          )}
        </div>

        <label className={styles.stock}>{stock} available</label>
        {stock ? (
          <progress className={styles.progressBar} max="100" value={stock}>
            {stock}
          </progress>
        ) : (
          <Skeleton />
        )}
        <label className={styles.descripcionDetailProduct}>Description</label>
        <p className={styles.descripction}>{description}</p>
        {/* <label className={styles.more}>Leer mas</label> */}
        <div className={styles.apartadoCompras}>
          <label className={styles.cantidad}>quantity</label>
          <input
            className={styles.inputCantidad}
            type="number"
            min="1"
            max="5"
            defaultValue="1"
          />
          <label className={styles.shopMax}>Max 5</label>
          <button className={styles.btnShopNow} type="submit">
            Buy now
          </button>
          <div className={styles.btnCartAndList}>
            <button className={styles.addCart}>
              <ShoppingCartOutlinedIcon /> Add to cart
            </button>
            <button className={styles.listWish}>
              <FavoriteBorderIcon />
              Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
