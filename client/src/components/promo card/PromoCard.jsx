import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './PromoCard.module.css'

export default function PromoCard ({image,id,name}){

    const navigate = useNavigate()
    const [hover,setHover]= useState(false)
    const handleHover = ()=>{
        setHover(!hover)
    }

    const handleClick = ()=>{
        navigate(`/detailProduct/${id}`)
    }

    return (
        <div className={styles.Container} onMouseEnter={handleHover} onMouseLeave={handleHover}>
            <img src={image} alt={name}/>
            {hover && (
                <div style={{position:'absolute',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={handleClick}>
                <div className={styles.overlay}/>
                <h1 className={styles.noBlur}>{name.toUpperCase()}</h1>
                </div>
            )}
           
        </div>
    )
}