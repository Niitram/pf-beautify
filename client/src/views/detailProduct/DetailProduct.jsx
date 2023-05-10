import { Stack, Rating } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./DetailProduct.module.css";

function DetailProduct() {
  let cantStock = 20;
  return (
    <div className={styles.container}>
      <img
        className={styles.imgProduct}
        src="../src/assets/images/surtido-productos-cuidado-alto-angulo.jpg"
        alt="Product"
      />
      <div className={styles.containerDetails}>
        <h1 className={styles.nombreProduct}>Nombre del producto</h1>
        <h3 className={styles.descripcionProduct}>DESCRIPCION DEL PRODUCTO</h3>
        <Stack>
          <Rating defaultValue={2.5} precision={0.5} readOnly />
        </Stack>
        <div className={styles.descripcionProduct}>
          <h3 className={styles.descuento}>$29.99</h3>
          <h3 className={styles.precio}> $19.99 </h3>
        </div>
        <label className={styles.stock}>Quedan {cantStock} Productos</label>
        <LinearProgress
          sx={{ width: `100%`, height: 5, borderRadius: "16px" }}
          variant="determinate"
          value={80}
        />
        <progress max="100" value="80">
          80
        </progress>
        <label className={styles.descripcionDetailProduct}>Descripcion</label>
        <p className={styles.descripction}>
          Ea ut sint nisi cillum anim non proident amet eiusmod non id id fugiat
          consequat. Laboris aute et pariatur Lorem. Nulla tempor nulla laboris
          elit.
        </p>
        <label className={styles.more}>Leer mas</label>
        <div>
          <label className={styles.cantidad}>Cantidad</label>
          <input type="number" min="1" defaultValue="1" />
          <label className={styles.shopMax}>Compra Máxima 5</label>
          <button className={styles.btnShopNow} type="submit">
            Comprar Ahora
          </button>
          <div>
            <button className={styles.addCart}>
              <ShoppingCartIcon className={styles.icoCart} /> Agregar al Carrito
            </button>
            <button className={styles.listWish}>
              <FavoriteBorderIcon className={styles.icoList} />
              Lista de Deseos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
