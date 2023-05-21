import { Link } from "react-router-dom";
import styles from "./Button-accent1.module.css";

function ButtonAccent1({ text, route }) {
  return (
    <Link to={`${route}`} style={{ textDecoration: "none" }}>
      <button className={styles.Container}>{text}</button>
    </Link>
  );
}

export default ButtonAccent1;
