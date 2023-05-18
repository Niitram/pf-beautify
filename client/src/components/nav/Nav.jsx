import styles from "./Nav.module.css";
import ButtonNav from "../buttons/buttonNav/ButtonNav";
import ButtonAccent1 from "../buttons/Button-accent1/Button-accent1";
import logo from "../../assets/images/logo-beautify-500x500.png";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../../utils/firebaseConfig";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions";
import { INVITED, CLIENT } from "../../utils/roles";

function Nav({ handleLoginClick }) {
  const userData = useSelector((state) => state.userData);
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutOrIn = async () => {
    if (userData.rol === INVITED) {
      handleLoginClick();
    } else {
      dispatch(logout());
      await signOut(auth);
      navigate("/");
    }
  };

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
        {userData.rol === CLIENT && (
          <ButtonNav text={"My Profile"} route={"/detailUser"}></ButtonNav>
        )}
        <button onClick={onLogoutOrIn} className={styles.logoutButton}>
          {userData.rol === INVITED ? "Login" : <LogoutOutlinedIcon />}
        </button>
        <ButtonAccent1 text={""} route={"/cart"}></ButtonAccent1>

        {/* <Link to={`/detailUser`}>detailUser</Link>
      <Link to={`/dashboardAdmin`}>dashboardAdmin</Link> */}
      </div>
    </nav>
  );
}

export default Nav;
