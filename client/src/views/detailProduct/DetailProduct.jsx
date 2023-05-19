import { Stack, Rating, Skeleton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./DetailProduct.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../request/product";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ImageComponent from "../../components/imageComponent/ImageComponent";
import productDefault from "../../assets/images/camera-icon.png";
import { useSelector } from "react-redux";

function DetailProduct({ handleLoginClick }) {
  
  const handleQuantity = (event) => {
    setQuantity(Number(event.target.value));
    console.log(quantity);
  };

  const handleAddToCart = (event) => {
    if (!userData.id) return handleLoginClick();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productExist = cart.find((cartItem) => cartItem.id == product.id);

    if (productExist)
      cart.map((cartItem) => {
        if (cartItem.id == product.id) {
          //Si la cantidad es mayor al stock le asigno el valor del stock
          if (cartItem.quantity + quantity >= cartItem.stock) {
            cartItem.quantity = cartItem.stock;
          }
          //Sino sumo la cantidad guardada mas la cantidad pedida
          else {
            cartItem.quantity += quantity;
          }
        }
      });
    else {
      cart.push({
        category: product.category,
        description: product.description,
        discount: product.discount,
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        rate: product.rate,
        state: product.state,
        stock: product.stock,
        quantity: quantity,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const userData = useSelector((state) => state.userData);

  const handleClick = () => {
    if (!userData.id) handleLoginClick();
  };

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
      <div className={styles.containerBack}>
        <Link to={"/products"}>
          <ArrowBackIosNewIcon />
        </Link>
        {image && (
          <ImageComponent src={image} alt={name} notFoundSrc={productDefault} />
        )}
      </div>
      <div className={styles.containerDetails}>
        {name ? (
          <h1 className={styles.nombreProduct}>{name}</h1>
        ) : (
          <Skeleton height={40} />
        )}
        <h3 className={styles.descripcionProduct}>Description</h3>
        {rate ? (
          <Stack>
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
          {price ? (
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
            onChange={handleQuantity}
            type="number"
            min="1"
            max="5"
            defaultValue="1"
          />
          <label className={styles.shopMax}>Max 5</label>
          <Link to="/cart">
            <button
              onClick={handleAddToCart}
              name="buyNow"
              className={styles.btnShopNow}
              type="submit"
            >
              Buy now
            </button>
          </Link>
          <div className={styles.btnCartAndList}>
            <button
              onClick={handleAddToCart}
              name="addToCart"
              className={styles.addCart}
            >
              <ShoppingCartOutlinedIcon /> Add to cart
            </button>
            <button className={styles.listWish} onClick={handleClick}>
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
