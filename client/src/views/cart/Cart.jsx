import styles from "./Cart.module.css";
import { NavLink } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
import { useState } from "react";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useSelector } from "react-redux";

initMercadoPago("TEST-e111adff-51c1-4945-a5fa-3a3adfb6f8b1");
function Cart() {
  let cantArticulos =3;

    const emailUsuario = useSelector((state)=>state.userData.email)
  const localCarrito = JSON.parse(localStorage.getItem('cart'))
  const carrito = localCarrito.map(element=>{
    return{
      title:element.name,
      quantity:element.quantity,
      unit_price:element.price,
      id:element.id
    }
  })
  const [preferenceId,setPreferenceId] = useState(0)

  const handleCheckOut = () => {
    let aux = [...carrito,emailUsuario]
    axios.post('http://localhost:3001/mercadopago/create_preference',aux)
    .then(({data})=>setPreferenceId(data.id))
    .catch((error)=>alert('Hubo un error al procesar el carrito, por favor intenta mas tarde'))
  };
  

  return (
    <div className={styles.containerGlobal}>
      <div className={styles.containerArticulos}>
        <div className={styles.continuarComprando}>
          <ArrowBackIosNewIcon />
          <NavLink to="/home">continuar comprando</NavLink>
        </div>
        <hr />
        <div className={styles.textArticulo}>
          <label className={styles.txtCarrito}>Carrito de compra</label>
          <label className={styles.cantCart}>
            Tienes {cantArticulos} articulos en tu carrito
          </label>
        </div>
        <div className={styles.articulo}>
          <div className={styles.imagenArticulo}>
            <img src="https://belcorpperu.vtexassets.com/arquivos/ids/244878-1600-auto?v=638169042175100000&width=1600&height=auto&aspect=true" />
          </div>
          <div className={styles.detallesArticulo}>
            <label className={styles.nameProduct}>Nombre de Producto</label>
            <label className={styles.descriptionProduct}>
              Descripcion del Producto
            </label>
          </div>
          <div className={styles.cantidad}>
            <label>1</label>
            <div className={styles.btnupdown}>
              <ArrowDropUpIcon />
              <ArrowDropDownIcon />
            </div>
          </div>
          <div className={styles.precio}>$391</div>
          <DeleteOutlineIcon />
        </div>
      </div>
      <button onClick={handleCheckOut}> CHECKOUT PROVISORIO</button>
      <Wallet initialization={{ preferenceId: `${preferenceId}` }} />

      {/* <div className={styles.detallesCompra}>
        <div className={styles.detallesPago}>
          <label className={styles.textTarjeta}>Detalles de tarjeta</label>
          <label className={styles.tipoTarjeta}>Tipo de Pago</label>
          <div className={styles.imagenMercadoPago}>
            <img src={mercadopago} alt="Mercado Pago" />
          </div>
        </div>
        <div className={styles.containerDatos}>
          <div className={styles.datosTarjeta}>
            <label className={styles.nombreTarjeta}>Nombre de la Tarjeta</label>
            <input type="text" placeholder="Nombre" />
          </div>
          <div className={styles.datosTarjeta}>
            <label className={styles.nombreTarjeta}>Numero de Tarjeta</label>
            <input type="number" placeholder="1111111-2222--33333" />
          </div>
          <div className={styles.containerdata}>
            <div className={styles.fechaTarjeta}>
              <label>Fecha de Expiracion</label>
              <input type="month" />
            </div>
            <div className={styles.cvv}>
              <label>CVV</label>
              <input type="number" placeholder="CVV" maxLength={4} />
            </div>
          </div>
        </div>
        <div className={styles.datosPagos}>
          <div className={styles.text}>
            <label>Subtotal</label>
            <label>$1,072</label>
          </div>
          <div className={styles.text}>
            <label>Envio</label>
            <label>$4</label>
          </div>
          <div className={styles.text}>
            <label>Total (igv incl.)</label>
            <label>$1,072</label>
          </div>
        </div>
        <div className={styles.total}>
          <label>$1,076</label>
          <button>Verificar</button>
        </div>
      </div> */}
    </div>
  );
}

export default Cart;
