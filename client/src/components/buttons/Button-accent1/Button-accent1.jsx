import { Link } from "react-router-dom";
import styles from "./Button-accent1.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function ButtonAccent1({ text, route }) {
  return (
    <Link to={`${route}`}>
      <button className={styles.Container}>
        {text}
        <ShoppingCartOutlinedIcon className={styles.cart} fontSize="small" />
      </button>
    </Link>
  );
}

export default ButtonAccent1;
