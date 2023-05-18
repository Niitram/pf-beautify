import { Rating } from "@mui/material";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import ImageComponent from "../imageComponent/ImageComponent";
import productDefault from "../../assets/images/camera-icon.png";

function Card({ image, price, name, rate, id }) {
  return (
    <div className={styles.aux}>
    <Link
      className={styles.link}
      style={{textDecoration:'none'}}
      to={`/detailProduct/${id}`}
    >
      <div className={styles.cardContainer}>
        <div className={styles.imagen}>
          <ImageComponent src={image} notFoundSrc={productDefault} />
        </div>
        <div className={styles.detailsCard}>
          <div className={styles.nombre}>{name.length >13 ? `${name.slice(0,14)}...`:name}</div>
          <Rating name="size-small" defaultValue={rate} size="small" readOnly />
          <div className={styles.precio}>${price}</div>
        </div>
      </div>
    </Link>
    </div>
  );
}

export default Card;
