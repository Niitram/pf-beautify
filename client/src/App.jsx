import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Landing from "./views/landing/Landing";
import Home from "./views/home/Home";
import About from "./views/about/About";
import Cart from "./views/cart/Cart";
import Products from "./views/products/Products";
import Services from "./views/services/Services";
import DashboardAdmin from "./views/dashboardAdmin/DashboardAdmin";
import DetailProduct from "./views/detailProduct/DetailProduct";
import DetailPayment from "./views/detailPayment/DetailPayment";
import DetailUser from "./views/detailUser/DetailUser";
import Nav from "./components/nav/Nav";
import { useDispatch } from "react-redux";
import {
  getAllCategories,
  getAllProducts,
  setUserInfoAction,
} from "./redux/actions";
import useGetProducts from "./hooks/useGetProducts";
import { useEffect } from "react";
import useGetCategories from "./hooks/useGetCategories";
import NewProduct from "./views/newProduct/NewProduct";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useToggle from "./hooks/useToggle";
import { loginWithGoogleFirebase } from "./utils/firebaseConfig";
import { getClient } from "./request/clients";
import { CLIENT } from "./utils/roles";

function App() {
  const locationNow = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products] = useGetProducts();
  const [categories] = useGetCategories();
  const [logout, setLogout] = useToggle(true);
  const auth = getAuth();

  useEffect(() => {
    dispatch(getAllCategories(categories));
    dispatch(getAllProducts(products));
  }, [dispatch, products, categories]);

  onAuthStateChanged(auth, async (usuarioFirebase) => {
    // las tres condiciones: hubo un cambio en la auth, el usuario recibido es de google, antes no había usuario logueado
    if (usuarioFirebase && usuarioFirebase.displayName) {
      if (logout) {
        await loginWithGoogleFirebase(usuarioFirebase, dispatch, navigate);
        setLogout(false);
      }
    } else if (usuarioFirebase && !usuarioFirebase.displayName) {
      const userCreated = await getClient(usuarioFirebase.email);
      // envía esa info al estado global
      dispatch(
        setUserInfoAction({
          id: userCreated.data.id,
          name: userCreated.data.fullName,
          rol: CLIENT,
        })
      );
    } else if (!logout) setLogout(true);
  });

  return (
    <div className="App">
      {locationNow.pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/detailUser" element={<DetailUser />} />
        <Route path="/detailProduct/:id" element={<DetailProduct />} />
        <Route path="/detailPayment" element={<DetailPayment />} />
        <Route path="/newProduct" element={<NewProduct />} />
      </Routes>
    </div>
  );
}

export default App;
