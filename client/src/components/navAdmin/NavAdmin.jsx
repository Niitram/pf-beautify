import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions";
import { postCart } from "../../request/cart";
import ButtonNav from "../buttons/buttonNav/ButtonNav";
import styles from "./NavAdmin.module.css";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../../utils/firebaseConfig";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";



export default function NavAdmin({ setLogout }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = async () => {
    setLogout(false);
    const auth = getAuth(firebaseApp);
    // trae información del carrito y el id de usuario del local
    const localCart = JSON.parse(localStorage.getItem("cart"));
    const userId = JSON.parse(localStorage.getItem("userData")).id;

    if (localCart.length) {
      // acomoda la info del cart local para mandar al back sólo id y quantity de cada producto
      const products = localCart.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }));
      // mandar al back la info del carrito
      await postCart(userId, { products });
    } else await postCart(userId, { products: [] });

    localStorage.clear();
    dispatch(logout());
    navigate("/");
    await signOut(auth);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const onMenuClicked = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className={styles.container}>
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
        <ButtonNav text={"Clients"} route="/dashboardAdmin/clients"></ButtonNav>
        <ButtonNav
          text={"Appointments"}
          route={"/dashboardAdmin/appointments"}
        ></ButtonNav>
        <ButtonNav
          text={"Services"}
          route={"/dashboardAdmin/services_control"}
        ></ButtonNav>
        <ButtonNav
          text={"Professionals"}
          route={"/dashboardAdmin/professionals"}
        ></ButtonNav>
        <ButtonNav
          text={"Products"}
          route={"/dashboardAdmin/products_control   "}
        ></ButtonNav>
        <button onClick={onLogout} className={styles.LogOutBtn}>
          Logout
        </button>
        <div  className={styles.ocultarmenu}>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}
