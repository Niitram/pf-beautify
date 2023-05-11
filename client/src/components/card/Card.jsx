import { Stack, Rating } from "@mui/material";
import styles from "./Card.module.css"; 
import {Link} from "react-router-dom"

function Card({ image, price, name, rate,id }) {
  return (
    <Link style={{ textDecoration: 'none' }} to={`/detailProduct/${id}`} >
      <div className={styles.card}>
      <img src={image} alt={name} />
      <span>{name}</span>
      <Stack>
        <Rating
          name="half-rating-read"
          defaultValue={rate}
          precision={0.5}
          readOnly
        />
      </Stack>

      <span>${price}</span>
    </div>
    </Link>
  );
}

export default Card;
