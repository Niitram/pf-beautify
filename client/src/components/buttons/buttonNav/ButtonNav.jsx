import { Link } from "react-router-dom";
import styles from "./buttonNav.module.css";
import { useLocation } from "react-router-dom";

function ButtonNav({ text, route }) {
  const { pathname } = useLocation();
  return (
    <Link to={`${route}`}>
      <button
        className={pathname === route ? styles.Current : styles.Container}
      >
        {text}
      </button>
    </Link>
  );
}

export default ButtonNav;
