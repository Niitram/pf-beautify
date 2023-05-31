import styles from "./Cart.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState, useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../redux/actions";
import logoBeautify from "../../assets/images/logo-beautify-500x500.png";

// import Footer from "../../components/footerAll/FooterAll";

import askPreference from "../../request/preference";
import AlertDialogSlide from "../../components/slideDialog/slideDialog";
import { getClient } from "../../request/clients";
import useToggle from "../../hooks/useToggle";

initMercadoPago("TEST-6baebe46-f407-406f-8011-2f812f18a2a3");

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [balance, setBalance] = useState(0);
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isBalance, setIsBalance] = useToggle(false);

  //*** validar el carrito
  let cantArticulos = cart.length;
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += (cart[i].price - cart[i].discount) * cart[i].quantity;
  }

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("userData")).email;
    //Se trae el balance del usuario y si es es null se setea en 0
    getClient(email).then((res) => {
      let balanceDb = res.data.balance;
      if (!balanceDb) {
        balanceDb = 1;
      }
      setBalance(balanceDb);
    });

    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  const handleDelete = (id) => {
    if (id === 0 && isBalance) setIsBalance(false);
    const newCart = cart.filter((cartItem) => cartItem.id != id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const handleAddBalance = () => {
    setCart((prevState) => [
      ...prevState,
      {
        description: "Balance",
        discount: 0,
        id: 0,
        image: logoBeautify,
        name: "Balance",
        price: balance,
        quantity: 1,
        state: true,
        stock: 1,
      },
    ]);
    setIsBalance(true);
  };

  const handleQuantity = (event) => {
    const name = event.target.name;
    const id = Number(event.target.value);
    const newCart = [...cart];

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

  const handleClickOpenCheckoutDialog = () => {
    setOpenCheckoutDialog(true);
  };
  const handleCloseCheckoutDialog = () => {
    setOpenCheckoutDialog(false);
  };

  const handleClickOpenDeleteDialog = (e) => {
    setItemToDelete(Number(e.target.value));
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const emailUsuario = useSelector((state) => state.userData.email);

  const handleCheckOut = async () => {
    try {
      const localCarrito = JSON.parse(localStorage.getItem("cart")) || [];
      const carrito = localCarrito.map((element) => {
        return {
          title: element.name,
          quantity: element.quantity,
          unit_price: element.price,
          id: element.id,
        };
      });
      let aux = [...carrito, emailUsuario];
      const respMP = await askPreference(aux);
      localStorage.setItem("preference", JSON.stringify(respMP.data.id));
    } catch (error) {
      dispatch(
        showError({
          tittle: "Wrong-cart",
          message:
            "There was an error processing the cart, please try again later",
        })
      );
    }
  };
  console.log(cart);
  console.log(isBalance);

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
        {balance !== 0 && (
          <span>Has a balance of {balance} in your favor </span>
        )}
        <label className={styles.txtCarrito}>
          Total price $ {totalPrice.toFixed(2)}
        </label>
        {cart.map((cartItem) => (
          <div key={cartItem.id} className={styles.articulo}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className={styles.imagenArticulo}
                style={{ marginRight: "10px" }}
              >
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
              <div className={styles.cantidad} style={{ marginRight: "10px" }}>
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
                onClick={handleClickOpenDeleteDialog}
                value={cartItem.id}
              ></button>
            </div>
          </div>
        ))}
        {cantArticulos > 0 && (
          <button
            className={styles.checkout}
            onClick={() => {
              handleCheckOut();
              handleClickOpenCheckoutDialog();
            }}
          >
            Checkout
          </button>
        )}
        {cantArticulos > 0 && balance !== 0 && !isBalance && (
          <button onClick={handleAddBalance}>Use my benefit</button>
        )}
      </div>
      <AlertDialogSlide
        handleCloseDialog={handleCloseDeleteDialog}
        openDialog={openDeleteDialog}
        yesCallback={() => {
          handleDelete(itemToDelete);
          handleCloseDeleteDialog();
        }}
        questionText={"Are you sure you wanna remove that item from your card?"}
      />

      <AlertDialogSlide
        handleCloseDialog={handleCloseCheckoutDialog}
        openDialog={openCheckoutDialog}
        yesCallback={() => navigate("/checkout")}
        questionText={"Are you sure you wanna proceed to purchase?"}
      />
    </div>
  );
}

export default Cart;
