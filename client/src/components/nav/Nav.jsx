import styles from "./Nav.module.css";
import ButtonNav from "../buttons/buttonNav/ButtonNav";
import ButtonAccent1 from "../buttons/Button-accent1/Button-accent1";
import logo from "../../assets/images/logo-beautify-500x500.png";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Nav() {
  return (
    <nav className={styles.navBar}>
      <NavLink to="/home">
        <img src={logo} alt="logo" />
      </NavLink>
      {/* <ButtonNav text={"Home"} route={"/home"}></ButtonNav> */}
      <input type="checkbox" id="check" className={styles.check} />
      <label htmlFor="check" className={styles.mostrarmenu}>
        <MenuIcon />
      </label>
      <div className={styles.botones}>
        <ButtonNav text={"About"} route={"/about"}></ButtonNav>
        <ButtonNav text={"Products"} route={"/products"}></ButtonNav>
        <ButtonNav text={"Services"} route={"/services"}></ButtonNav>
        <ButtonAccent1 text={"Carrito"} route={"/cart"}></ButtonAccent1>
        <label htmlFor="check" className={styles.ocultarmenu}>
          <CloseIcon />
        </label>
        {/* <Link to={`/detailUser`}>detailUser</Link>
      <Link to={`/dashboardAdmin`}>dashboardAdmin</Link> */}
      </div>
    </nav>
  );
}

export default Nav;
