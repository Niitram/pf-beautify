import { useEffect,useState } from 'react'
import styles from './Checkout.module.css'
import { Wallet } from '@mercadopago/sdk-react'

export default function Checkout (){
    const [cart,setCart] = useState([])
    const [preferenceId,setPreferenceId] = useState(0)
    
    useEffect(()=>{
        setPreferenceId(JSON.parse(localStorage.getItem('preference')))
        setCart(JSON.parse(localStorage.getItem('cart')))
    },[])
    console.log([...cart,preferenceId])
    let total = 0;
    const count = cart.length && cart.forEach(element => {
        total += element.price * element.quantity
    }); 
    return(
        <div className={styles.container}>
            <div className={styles.aux}>
                <h2>Choose your payment method</h2>
                <div className={styles.pasarela}>
                    <div className={styles.mercadopago}>
                    { preferenceId?(<Wallet initialization={{ preferenceId: `${preferenceId}` }}/>):''}
                    </div>
                    <div className={styles.tarjeta}>
                        <label >Nombre de la Tarjeta</label>
                        <input type="text" placeholder="Nombre" className={styles.nombreTarjeta} />
                        <label >Numero de Tarjeta</label>
                        <input type="number" placeholder="1111111-2222--33333" className={styles.nombreTarjeta}/>
                        <div style={{display:'flex',}}>
                            <div style={{display:'flex',flexDirection:'column'}}>
                            <label>Fecha de Expiracion</label>
                            <input type="month" className={styles.inputCorto} />
                        </div>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <label>CVV</label>
                            <input className={styles.inputCorto} type="number" placeholder="CVV" maxLength={4}  />  
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>
              </div>
    )
}