import './App.css'
import axios from 'axios'
import { Route, Routes, useLocation } from "react-router-dom"
import { useState } from 'react'
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
import Nav from './components/nav/Nav'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('TEST-6baebe46-f407-406f-8011-2f812f18a2a3');

function App() {
  const locationNow = useLocation();
  const dispatch = useDispatch();
  const [products] = useGetProducts();
  const [categories] = useGetCategories();

  const [preferenceId, setPreferenceId] = useState(null);
  const [orderData, setOrderData] = useState([{ quantity: 1, unit_price: 10, email: 'test@gmail.com', description: "Blotted Lip" },
  { quantity: 1, unit_price: 10, email: 'test@gmail.com', description: "Eyeliner" }]);

  const handleClick = () => {
    
    axios.post("http://localhost:3001/mercadopago/create_preference", orderData)
    .then(response => {
      console.log(response.id)
      setPreferenceId(response.data.id)
    })
    .catch(error => {
      console.log(error)
    })
  };
  


  return (
    <>
      {
        locationNow.pathname !== "/" && <Nav />
      }
       <button id="wallet_container" onClick={handleClick}  ></button>
     
       <Wallet  initialization={{ preferenceId: `${preferenceId}` }}  />
      </>
  )
}

export default App;
