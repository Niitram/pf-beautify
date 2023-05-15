import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./views/landing/Landing";
import Home from "./views/home/Home";
import About from "./views/about/About";
import Cart from "./views/cart/Cart";
import Products from "./views/products/Products";
import Services from "./views/services/Services";
import DashboardAdmin from "./views/dashboardAdmin/DashboardAdmin";
import DashboardClient from "./views/dashboardClient/DashboardClient";
import DetailProduct from "./views/detailProduct/DetailProduct";
import DetailPayment from "./views/detailPayment/DetailPayment";
import DetailUser from "./views/detailUser/DetailUser";
import Nav from "./components/nav/Nav";
import { useDispatch } from "react-redux";
import { getAllCategories, getAllProducts } from "./redux/actions";
import useGetProducts from "./hooks/useGetProducts";
import { useEffect } from "react";
import useGetCategories from "./hooks/useGetCategories";
import NewProduct from "./views/newProduct/NewProduct";

function App() {
  const locationNow = useLocation();
  const dispatch = useDispatch();
  const [products] = useGetProducts();
  const [categories] = useGetCategories();

  useEffect(() => {
    dispatch(getAllCategories(categories));
    dispatch(getAllProducts(products));
  }, [dispatch, products, categories]);

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
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
        <Route path="/dashboard/client/:id" element={<DashboardClient/>} />
        <Route path="/detailUser" element={<DetailUser />} />
        <Route path="/detailProduct/:id" element={<DetailProduct />} />
        <Route path="/detailPayment" element={<DetailPayment />} />
        <Route path="/newProduct" element={<NewProduct />} />
      </Routes>
    </div>
  );
}

export default App;
