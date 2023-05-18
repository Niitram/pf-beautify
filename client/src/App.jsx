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
import { useDispatch, useSelector } from "react-redux";
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
import Login from "./components/login/Login";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { CLIENT, INVITED, ADMIN } from "./utils/roles";

function App() {
  const locationNow = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products] = useGetProducts();
  const [categories] = useGetCategories();
  const [logout, setLogout] = useToggle(true);
  const [loginVisible, setLoginVisible] = useToggle(false);
  const auth = getAuth();
  const userData = useSelector((state) => state.userData);
  const [creatingAccount, setCreatingAccount] = useToggle(false);

  const handleLoginClick = () => {
    console.log("handleClick");
    setLoginVisible(!loginVisible);
  };

  useEffect(() => {
    dispatch(getAllCategories(categories));
    dispatch(getAllProducts(products));
  }, [dispatch, products, categories]);

  onAuthStateChanged(auth, async (usuarioFirebase) => {
    // las tres condiciones: hubo un cambio en la auth, el usuario recibido es de google, antes no había usuario logueado
    if (
      usuarioFirebase &&
      usuarioFirebase.displayName &&
      !userData.email &&
      !creatingAccount
    ) {
      if (logout) {
        await loginWithGoogleFirebase(usuarioFirebase, dispatch, navigate);
        console.log(usuarioFirebase);
        setLogout(false);
      }
    } else if (
      // login usuarios de mail
      usuarioFirebase &&
      !usuarioFirebase.displayName &&
      !userData.email &&
      !creatingAccount
    ) {
      //! esto trae muchas alertas en la consola cuando se crea un usuario, podríamos eliminar este else if
      // const userCreated = await getClient(usuarioFirebase.email);
      // // envía esa info al estado global
      // if (userCreated.data) {
      //   dispatch(
      //     setUserInfoAction({
      //       id: userCreated.data.id,
      //       name: userCreated.data.fullName,
      //       rol: CLIENT,
      //     })
      //   );
      // }
    } else if (!logout) {
      setLogout(true);
    }
  });

  return (
    <div className="App">
      {locationNow.pathname !== "/" && (
        <Nav handleLoginClick={handleLoginClick} />
      )}

      {loginVisible && (
        <Login
          loginVisible={loginVisible}
          handleLoginClick={handleLoginClick}
          creatingAccount={creatingAccount}
          setCreatingAccount={setCreatingAccount}
        />
      )}

      <Routes>
        {/* Rutas que tiene acceso cualquiera */}
        <Route
          path="/"
          element={
            <Landing
              handleLoginClick={handleLoginClick}
              loginVisible={loginVisible}
            />
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/detailProduct/:id"
          element={<DetailProduct handleLoginClick={handleLoginClick} />}
        />

        {/* Rutas solo para ADMIN */}
        <Route element={<ProtectedRoute isAllowed={userData.rol === ADMIN} />}>
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/newProduct" element={<NewProduct />} />
        </Route>
        {/* Rutas solo para CLIENT */}
        <Route element={<ProtectedRoute isAllowed={userData.rol === CLIENT} />}>
          <Route path="/detailUser" element={<DetailUser />} />
        </Route>
        {/* Rutas para CLIENT Y ADMIN*/}
        <Route
          element={
            <ProtectedRoute
              isAllowed={userData.rol === ADMIN || userData.rol === CLIENT}
            />
          }
        >
          <Route path="/detailPayment" element={<DetailPayment />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
