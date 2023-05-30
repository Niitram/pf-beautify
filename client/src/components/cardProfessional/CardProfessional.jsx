import { Skeleton } from "@mui/material";
import styles from "./CardProfessional.module.css";

function CardProfessional({ professional, service }) {
  return (
    <div className={styles.cardProfessional}>
      {professional.image && (
        <img
          className={styles.image}
          src={professional.image}
          alt="Professional"
        />
      )}
      {professional.fullname ? (
        <div className={styles.containerInfo}>
          <h3 className={styles.fullname}>{professional.fullname}</h3>
          <p className={styles.direction}>{professional.direction}</p>
          <p className={styles.service}>{service.name}</p>
        </div>
      ) : (
        <Skeleton width={300} height={300} />
      )}
    </div>
  );
}

export default CardProfessional;
