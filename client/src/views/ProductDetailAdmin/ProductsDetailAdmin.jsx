import { useParams } from 'react-router'
import styles from './ProductDetailAdmin.module.css'
import { useEffect, useState } from 'react'
import { getProductById } from '../../request/product'

export default function ProductDetailAdmin(){
    const {id} = useParams()
    const [product,setProduct]=useState({})

    useEffect(()=>{
        getProductById(id).then(({data})=>setProduct(data))
    },[])
    console.log(id)

    return(
        <div className={styles.container}>
            <div className={styles.card}>
                    <div className={styles.titulo}>
                        <h1>Product #{product.id}</h1>
                        
                        <h3>{product.name}</h3>
                    </div>
                <div className={styles.important}>
                    <div className={styles.dataImportante}>
                        <h1>Stock</h1>
                        <h3 style={product.stock<10 ? {color:'red'}:{color:'green'}}>{product.stock}</h3>
                    </div>
                    <div className={styles.dataImportante}>
                        <h1>Price</h1>
                        <h3>${product.price}</h3>
                    </div> 
                </div>
                <div className={styles.otro}>
                    <div className={styles.otraData}>
                        <h1>Discount</h1>
                        <h3>{product.discount?`$${product.discount}`:'none'}</h3>
                    </div>
                    <div className={styles.otraData}>
                        <h1>Rate</h1>
                        <h3>{product.rate.toFixed(2)}</h3>
                    </div>
                </div>
                <h1>Gallery:</h1>
                <img style={{width:'10rem'}} src={product.image} alt={product.name} />
            </div>
        </div>
    )
}