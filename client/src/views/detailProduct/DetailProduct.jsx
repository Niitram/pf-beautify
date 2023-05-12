import { Stack, Rating } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./DetailProduct.module.css";
import { NavLink } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

function DetailProduct() {
  let cantStock = 20;
  return (
    <div className={styles.container}>
      <div className={styles.containerImagen}>
        <NavLink to="/products">
          <ArrowLeftIcon />
          Regresar
        </NavLink>
        <img
          className={styles.imgProduct}
          src="../src/assets/images/surtido-productos-cuidado-alto-angulo.jpg"
          alt="Product"
        />
      </div>
      <div className={styles.containerDetails}>
        <h1 className={styles.nombreProduct}>Nombre del producto</h1>
        <h3 className={styles.descripcionProduct}>DESCRIPCION DEL PRODUCTO</h3>
        <Stack>
          <Rating defaultValue={2.5} precision={0.5} />
        </Stack>
        <div className={styles.descripcionProduct}>
          <h3 className={styles.descuento}>$29.99</h3>
          <h3 className={styles.precio}> $19.99 </h3>
        </div>

        <label className={styles.stock}>Quedan {cantStock} Unidades</label>
        <progress className={styles.progressBar} max="100" value="80">
          80
        </progress>
        <label className={styles.descripcionDetailProduct}>Descripción</label>
        <p className={styles.descripction}>
          Ea ut sint nisi cillum anim non proident amet eiusmod non id id fugiat
          consequat. Laboris aute et pariatur Lorem. Nulla tempor nulla laboris
          elit.
        </p>
        {/* <label className={styles.more}>Leer mas</label> */}
        <div className={styles.apartadoCompras}>
          <label className={styles.cantidad}>Cantidad</label>
          <input
            className={styles.inputCantidad}
            type="number"
            min="1"
            max="5"
            defaultValue="1"
          />
          <label className={styles.shopMax}>Compra Máxima 5</label>
          <button className={styles.btnShopNow} type="submit">
            Comprar Ahora
          </button>
          <div className={styles.btnCartAndList}>
            <button className={styles.addCart}>
              <ShoppingCartOutlinedIcon /> Agregar al Carrito
            </button>
            <button className={styles.listWish}>
              <FavoriteBorderIcon />
              Lista de Deseos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
