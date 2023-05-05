import './App.css'
import { Route, Routes } from "react-router-dom"
import Landing from "./views/landing/Landing"
import Home from "./views/home/Home"
import About from "./views/about/About"
import Cart from "./views/cart/Cart"
import Products from "./views/products/Products"
import Services from "./views/services/Services"
import DashboardAdmin from "./views/dashboardAdmin/DashboardAdmin"
import DetailProduct from "./views/detailProduct/DetailProduct"
import DetailPayment from "./views/detailPayment/DetailPayment"
import DetailUser from "./views/detailUser/DetailUser"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/detailUser" element={<DetailUser />} />
        <Route path="/detailProduct" element={<DetailProduct />} />
        <Route path="/detailPayment" element={<DetailPayment />} />
      </Routes>
    </>
  )
}

export default App
