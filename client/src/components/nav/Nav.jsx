import  { useState } from "react";
import styles from "./Nav.module.css";
import ButtonNav from "../buttons/buttonNav/ButtonNav";
import ButtonAccent1 from "../buttons/Button-accent1/Button-accent1";
import logo from "../../assets/images/logo-beautify-500x500.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { INVITED } from "../../utils/roles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Nav({ handleLoginClick, handleDetailClick }) {
  const userData = useSelector((state) => state.userData);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuClicked = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <nav className={styles.navBar}>
      <NavLink to="/home">
        <img className={styles.logo} src={logo} alt="logo" />
      </NavLink>
      <input
        type="checkbox"
        id="check"
        className={styles.check}
        checked={isMenuOpen}
        onChange={onMenuClicked}
      />
      <label htmlFor="check" className={styles.mostrarmenu}>
        <MenuIcon />
      </label>
      <div className={styles.botones}  onClick={onMenuClicked}>
        <label htmlFor="check">
          <ButtonNav text={"Home"} route={"/home"}></ButtonNav>
        </label>
        <ButtonNav text={"About"} route={"/about"}></ButtonNav>
        <ButtonNav text={"Products"} route={"/products"}></ButtonNav>
        <ButtonNav text={"Services"} route={"/services"}></ButtonNav>
        {userData.rol === INVITED ? (
          <button className={styles.LogInBtn} onClick={handleLoginClick}>
            {" "}
            Log In
          </button>
        ) : (
          <>
            <button className={styles.myProfile} onClick={handleDetailClick}>
              Profile
            </button>
            <ButtonAccent1 text={"Cart"} route={"/cart"}></ButtonAccent1>
          </>
        )}
        <label htmlFor="check" className={styles.ocultarmenu}>
          <CloseIcon />
        </label>
      </div>
    </nav>
  );
}

export default Nav;
