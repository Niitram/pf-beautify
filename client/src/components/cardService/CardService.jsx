import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./CardService.module.css";

function CardService({ service }) {
  const { description, id, image, name, rate } = service;
  console.log(name);
  return (
    <Link style={{ textDecoration: "none" }} to={`/detailService/${id}`}>
      <div className={styles.containerCard}>
        <img className={styles.image} src={image} alt="" />
        <h3 className={styles.title}>{name}</h3>
        <div className={styles.containerInfo}>
          <Rating
            sx={{ mt: 15 }}
            name="size-small"
            defaultValue={rate}
            size="small"
            readOnly
          />
          <p className={styles.description}>{description}</p>
          <button className={styles.button}>View</button>
        </div>
      </div>
    </Link>
  );
}

export default CardService;
