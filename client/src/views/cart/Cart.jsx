import styles from "./Cart.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import { useState, useEffect } from "react";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../redux/actions";
import useToggle from "../../hooks/useToggle";
import Checkout from "../Checkout/Checkout";

initMercadoPago("TEST-e111adff-51c1-4945-a5fa-3a3adfb6f8b1");

function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  //*** validar el carrito
  let cantArticulos = cart.length;
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += (cart[i].price - cart[i].discount) * cart[i].quantity;
  }

  const handleDelete = (event) => {
    const id = Number(event.target.value);
    const newCart = cart.filter((cartItem) => cartItem.id != id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const handleQuantity = (event) => {
    const name = event.target.name;
    const id = Number(event.target.value);
    const newCart = [...cart];
    console.log("name", name, "id", id);

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === id) {
        if (name == "less") {
          if (newCart[i].quantity - 1 >= 1) {
            newCart[i].quantity = newCart[i].quantity - 1;
          }
        } else {
          if (newCart[i].quantity + 1 <= newCart[i].stock) {
            newCart[i].quantity = newCart[i].quantity + 1;
          }
        }
      }
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  const emailUsuario = useSelector((state) => state.userData.email);
  const localCarrito = JSON.parse(localStorage.getItem("cart")) || [];
  const carrito = localCarrito.map((element) => {
    return {
      title: element.name,
      quantity: element.quantity,
      unit_price: element.price,
      id: element.id,
    };
  });
  const [preferenceId, setPreferenceId] = useState(0);
  const handleCheckOut = () => {
    let aux = [...carrito, emailUsuario];
    axios
      .post("http://localhost:3001/mercadopago/create_preference", aux)
      .then(({ data }) => {
        // setPreferenceId(data.id)
        console.log(data.id)
        localStorage.setItem('preference',JSON.stringify(data.id))
      })
      .then(navigate('/checkout'))
      .catch((error) => {
        console.log(error.message);
        dispatch(
          showError({
            tittle: "Wrong-cart",
            message:
              "There was an error processing the cart, please try again later",
          })
        );
      });
    
    };


  return (
    <div className={styles.containerGlobal}>
      <div className={styles.containerArticulos}>
        <div className={styles.continuarComprando}>
          <ArrowBackIosNewIcon />
          <NavLink to="/products">Continue buying</NavLink>
        </div>
        <hr />
        <div className={styles.textArticulo}>
          <label className={styles.txtCarrito}>Shopping cart</label>
          <label className={styles.cantCart}>
            You have {cantArticulos} items in your cart
          </label>
        </div>
        <label className={styles.txtCarrito}>
          Total price $ {totalPrice.toFixed(2)}
        </label>
        {cart.map((cartItem) => (
          <div key={cartItem.id} className={styles.articulo}>
            <div style={{display:'flex',alignItems:'center'}}>
            <div className={styles.imagenArticulo} style={{marginRight:'10px'}}>
              <Link to={`/detailProduct/${cartItem.id}`}>
                <img src={cartItem.image} />
              </Link>
            </div>
            <div className={styles.detallesArticulo}>
              <label className={styles.nameProduct}>{cartItem.name}</label>
              <label className={styles.descriptionProduct}>
                {cartItem.description.slice(0, 50)}...
              </label>
            </div>
            </div>
            <div className={styles.botonesArticulo}>
              <div className={styles.cantidad} style={{marginRight:'10px'}}>
                <div className={styles.btnupdown}>
                  <button
                    disabled={cartItem.quantity === cartItem.stock}
                    className={styles.btnCart}
                    onClick={handleQuantity}
                    name="add"
                    value={cartItem.id}
                  >
                    +
                  </button>
                  <h3 className={styles.cantidadProduct}>
                    {cartItem.quantity}
                  </h3>
                  <button
                    disabled={cartItem.quantity === 1}
                    className={styles.btnCart}
                    onClick={handleQuantity}
                    name="less"
                    value={cartItem.id}
                  >
                    -
                  </button>
                </div>

              </div>
              <div className={styles.precio}>
                $ {cartItem.price - cartItem.discount}
              </div>
              <button
                className={styles.btnDelete}
                onClick={handleDelete}
                value={cartItem.id}
              ></button>
            </div>
          </div>
        ))}
      <button className={styles.checkout} onClick={()=>{handleCheckOut()}}>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
