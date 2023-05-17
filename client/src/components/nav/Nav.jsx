import styles from "./Nav.module.css";
import ButtonNav from "../buttons/buttonNav/ButtonNav";
import ButtonAccent1 from "../buttons/Button-accent1/Button-accent1";
import logo from "../../assets/images/logo-beautify-500x500.png";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className={styles.navBar}>
      <NavLink to="/home">
        <div className={styles.imagen}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>
      </NavLink>
      {/* <ButtonNav text={"Home"} route={"/home"}></ButtonNav> */}

      <div className={styles.botones}>
        <ButtonNav text={"About"} route={"/about"}></ButtonNav>
        <ButtonNav text={"Products"} route={"/products"}></ButtonNav>
        <ButtonNav text={"Services"} route={"/services"}></ButtonNav>
        <ButtonAccent1 text={"Carrito"} route={"/cart"}></ButtonAccent1>
        {/* <Link to={`/detailUser`}>detailUser</Link>
      <Link to={`/dashboardAdmin`}>dashboardAdmin</Link> */}
      </div>
    </nav>
  );
}

export default Nav;
