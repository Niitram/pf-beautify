import { Stack, Rating } from "@mui/material";
import styles from "./Card.module.css";

function Card({ image, price, name, rate }) {
  return (
    <div className={styles.containerGlobal}>
      <div className={styles.cardContainer}>
        <div className={styles.imagen}>
          <img src={image} />
        </div>
        <div className={styles.detailsCard}>
          <div className={styles.nombre}>{name}</div>
          <Rating name="size-small" defaultValue={rate} size="small" readOnly />
          <div className={styles.precio}>${price}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
