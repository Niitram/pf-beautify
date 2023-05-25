import notfound from "../../assets/images/PageNotFound.svg";
import styles from "./NotFound.module.css";

export default function notFound() {
  return (
    <div className={styles.container}>
      <img className={styles.imagen} src={notfound} alt="not Found" />
    </div>
  );
}
