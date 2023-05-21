import { useEffect,useState } from 'react'
import styles from './Checkout.module.css'

export default function Checkout (){
    const [preferenceId,setPreferenceId] = useState('hola')
    useEffect(()=>{
        setPreferenceId(JSON.parse(localStorage.getItem('preference')))
    },[])
    // let total = 0;
    // const count = preferenceId && preferenceId.forEach(element => {
    //     total += element.price * element.quantity
    // }); 
    console.log(JSON.parse(localStorage.getItem('preference')))
    return(
        <div className={styles.container}>
            tu total es 
        </div>
    )
}