import { Stack, Rating } from "@mui/material";
import styles from "./Card.module.css"; 

function Card({ image, price, name, rate }) {
  return (
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
  );
}

export default Card;
