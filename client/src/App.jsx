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
  addAppointment,
  getAllCategories,
  getAllProducts,
  getBackupProducts,
  setFavorites,
  setUserInfoAction,
} from "./redux/actions";
import useGetProducts from "./hooks/useGetProducts";
import { useEffect } from "react";
import useGetCategories from "./hooks/useGetCategories";
import NewProduct from "./views/newProduct/NewProduct";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useToggle from "./hooks/useToggle";
import { loginWithGoogleFirebase } from "./utils/firebaseConfig";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { CLIENT, ADMIN, INVITED } from "./utils/roles";
import AlertWarning from "./components/AlertWarning/AlertWarning";
import PurchaseSuccess from "./views/purchaseSuccess/PurchaseSuccess";
import Loading from "./views/loading/Loading";
import Favorites from "./views/favorites/Favorites";
import { getFavorites } from "./request/favorites";
import Checkout from "./views/Checkout/Checkout";
import PurchaseError from "./views/purchaseError/PurchaseError";
import Clients from "./views/clients/Clients";
import Appointments from "./views/appointments/Appointments";
import ServicesControl from "./views/Services Control/ServicesControl";
import Professionals from "./views/Professionals/Professionals";
import ContactForm from "./views/ContactForm/contactForm";
import FooterAll from "./components/footerAll/FooterAll";
import NotFound from "./components/notFound/NotFound";
import DetailService from "./views/detailService/detailService";
import ProductsAdmin from "./views/ProductsAdmin/ProductsAdmin";
import ProductDetailAdmin from "./views/ProductDetailAdmin/ProductsDetailAdmin";
import UserHistory from "./views/userHistory/UserHistory";
import NewProfessional from "./views/newProfessional/newProfessional";

import CheckoutAppointment from "./views/checkoutAppointment/checkoutAppointment";
import AppointmentSuccess from "./views/appointmentSuccess/AppointmentSuccess";

import NavAdmin from "./components/navAdmin/NavAdmin";
import Sales from "./views/Sales/Sales";

//Para deploy
/* import axios from "axios"; */
/* axios.defaults.baseURL = "https://beautifybackend-production.up.railway.app/"; */

function App() {
  const locationNow = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products] = useGetProducts();
  const [categories] = useGetCategories();
  const errorState = useSelector((state) => state.errorState);
  const appointment = useSelector((state) => state.appointment);

  // sirve para saber si el usuario no está logueado (true), se usa para prevenir que se guarde la información del usuario cuando este se está deslogueando (archivo firebaseConfig)
  const [logout, setLogout] = useToggle(true);

  // sirve para mostrar y ocultar el formulario de login y detail
  const [loginVisible, setLoginVisible] = useToggle(false);
  const [detailVisible, setDetailVisible] = useToggle(false);

  // sirve para distinguir si el usuario está registrándose (true) o iniciando sesión
  const [creatingAccount, setCreatingAccount] = useToggle(false);

  const auth = getAuth();
  const userData = useSelector((state) => state.userData);

  const handleLoginClick = () => {
    setLoginVisible(!loginVisible);
  };

  const handleDetailClick = () => {
    setDetailVisible(!detailVisible);
  };

  useEffect(() => {
    dispatch(getAllCategories(categories));

    if (locationNow.pathname === "/favorites" && userData.id) {
      dispatch(getBackupProducts(products));
      getFavorites(userData.id).then(({ data }) => {
        dispatch(setFavorites(data));
      });
    } else dispatch(getAllProducts(products));
  }, [dispatch, products, categories]);

  // este useEffect trae la info del usuario desde el local Storage al estado global y setea los appointment si existen
  useEffect(() => {
    if (!userData.id) {
      const userInfo = JSON.parse(localStorage.getItem("userData")) || {
        id: null,
        name: null,
        email: null,
        rol: INVITED,
      };
      dispatch(setUserInfoAction(userInfo));
    }
    if (!appointment) {
      const appointmentInfo = JSON.parse(localStorage.getItem("appointment"));
      if (appointmentInfo) dispatch(addAppointment(appointmentInfo));
    }
  }, [dispatch]);

  // esta función se ejecuta cuando detecta un cambio en el usuario de firebase
  onAuthStateChanged(auth, async (usuarioFirebase) => {
    // las tres condiciones: hubo un cambio en la auth, el usuario recibido es de google, antes no había usuario logueado
    // la intención de estas condiciones es que sólo se ejecute la función cuando el usuario esté logueándose con Google

    if (
      usuarioFirebase &&
      usuarioFirebase.displayName &&
      !userData.email &&
      logout
    ) {
      try {
        await loginWithGoogleFirebase(
          usuarioFirebase,
          dispatch,
          navigate,
          locationNow
        );
        setLogout(false);

        const currentLocation = locationNow.pathname;
        const oldLocation = JSON.parse(localStorage.getItem("oldLocation"));

        if (currentLocation === "/loading") {
          if (usuarioFirebase.email === "beautifyfinalproyect@gmail.com")
            return navigate("/dashboardAdmin");
          if (!oldLocation || oldLocation === "/") navigate("/home");
          else navigate(oldLocation);
        }
      } catch (error) {
        const oldLocation = JSON.parse(localStorage.getItem("oldLocation"));
        if (!oldLocation) navigate("/");
        else navigate(oldLocation);
        console.log(error.message);
      }
    }
  });

  console.log(locationNow.pathname);

  return (
    <div className="App">
      {locationNow.pathname !== "/" &&
      locationNow.pathname !== "/loading" &&
      locationNow.pathname !== "/checkout" &&
      (locationNow.pathname == "/dashboardAdmin" ||
        locationNow.pathname == "/dashboardAdmin" ||
        locationNow.pathname == "/dashboardAdmin/clients" ||
        locationNow.pathname == "/dashboardAdmin/appointments" ||
        locationNow.pathname == "/dashboardAdmin/services_control" ||
        locationNow.pathname == "/dashboardAdmin/products_control/:id" ||
        locationNow.pathname == "/dashboardAdmin/newProfessional" ||
        locationNow.pathname == "/dashboardAdmin/products_control" ||
        locationNow.pathname == "/dashboardAdmin/professionals") ? (
        <NavAdmin setLogout={setLogout} />
      ) : (
        locationNow.pathname !== "/" &&
        locationNow.pathname !== "/loading" &&
        locationNow.pathname !== "/checkout" && (
          <Nav
            handleLoginClick={handleLoginClick}
            handleDetailClick={handleDetailClick}
          />
        )
      )}
      {errorState.tittle && (
        <AlertWarning
          tittleAlert={errorState.tittle}
          messageAlert={errorState.message}
        />
      )}
      {loginVisible && (
        <Login
          loginVisible={loginVisible}
          handleLoginClick={handleLoginClick}
          creatingAccount={creatingAccount}
          setCreatingAccount={setCreatingAccount}
        />
      )}

      {detailVisible && (
        <DetailUser
          setLogout={setLogout}
          detailVisible={detailVisible}
          handleDetailClick={handleDetailClick}
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
        <Route path="/loading" element={<Loading />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/detailService/:id" element={<DetailService />} />
        <Route
          path="/detailProduct/:id"
          element={<DetailProduct handleLoginClick={handleLoginClick} />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<ContactForm />} />

        {/* Rutas solo para ADMIN */}
        <Route element={<ProtectedRoute isAllowed={userData.rol === ADMIN} />}>
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/dashboardAdmin/newProduct" element={<NewProduct />} />
          <Route path="/dashboardAdmin/clients" element={<Clients />} />
          <Route
            path="/dashboardAdmin/appointments"
            element={<Appointments />}
          />
          <Route
            path="/dashboardAdmin/services_control"
            element={<ServicesControl />}
          />
          <Route
            path="/dashboardAdmin/professionals"
            element={<Professionals />}
          />
          <Route
            path="/dashboardAdmin/products_control"
            element={<ProductsAdmin />}
          />
          <Route
            path="dashboardAdmin/products_control/:id"
            element={<ProductDetailAdmin />}
          />
          <Route
            path="/dashboardAdmin/newProfessional"
            element={<NewProfessional />}
          />
          <Route path="/dashboardAdmin/sales" element={<Sales />} />
        </Route>
        {/* Rutas solo para CLIENT */}
        {/* <Route element={<ProtectedRoute isAllowed={userData.rol === CLIENT} />}>
          <Route
          path="/detailUser"
          element={<DetailUser setLogout={setLogout} />}
          />
        </Route> */}
        {/* Rutas para CLIENT Y ADMIN*/}
        <Route
          element={
            <ProtectedRoute
              isAllowed={
                JSON.parse(localStorage.getItem("userData"))?.rol === ADMIN ||
                JSON.parse(localStorage.getItem("userData"))?.rol === CLIENT
              }
            />
          }
        >
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchaseError" element={<PurchaseError />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/purchaseSuccess" element={<PurchaseSuccess />} />
          <Route path="/detailPayment" element={<DetailPayment />} />
          <Route path="/userHistory" element={<UserHistory />} />
          <Route
            path="/checkoutAppointment"
            element={<CheckoutAppointment />}
          />
          <Route path="/appointmentSuccess" element={<AppointmentSuccess />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {locationNow.pathname !== "/" &&
        locationNow.pathname !== "/loading" &&
        locationNow.pathname !== "/checkout" &&
        locationNow.pathname !== "/dashboardAdmin" && <FooterAll />}
    </div>
  );
}

export default App;
