import { Rating } from "@mui/material";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

function Card({ image, price, name, rate, id }) {
  return (
    <div className={styles.containerGlobal}>
      <Link style={{ textDecoration: "none" }} to={`/detailProduct/${id}`}>
        <div className={styles.cardContainer}>
          <div className={styles.imagen}>
            <img src={image} />
          </div>
          <div className={styles.detailsCard}>
            <div className={styles.nombre}>{name}</div>
            <Rating
              name="size-small"
              defaultValue={rate}
              size="small"
              readOnly
            />
            <div className={styles.precio}>${price}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
