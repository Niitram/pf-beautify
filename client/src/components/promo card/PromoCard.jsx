import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './PromoCard.module.css'
import useToggle from '../../hooks/useToggle'

export default function PromoCard ({image,id,name}){

    const [value,toggle]= useToggle(false)

    return (
        <div className={styles.Container} onMouseEnter={()=>toggle()} onMouseLeave={()=>toggle()}>
            <img src={image} alt={name}/>
            {value && (
                <Link  to={`/detailProduct/${id}`}  className={styles.link} >
                <div className={styles.overlay}/>
                <h1 className={styles.noBlur}>{name.toUpperCase()}</h1>
                </Link>
            )}
           
        </div>
    )
}