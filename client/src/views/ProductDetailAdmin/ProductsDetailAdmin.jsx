import { useParams,useNavigate } from 'react-router'
import styles from './ProductDetailAdmin.module.css'
import { useEffect, useState } from 'react'
import { getProductById, updateProduct } from '../../request/product'
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Skeleton } from "@mui/material";
import paleta from "../../assets/images/Paleta";
import CheckIcon from '@mui/icons-material/Check';
import filterEmpty from '../../utils/FilterEmptyProps';
import axios from 'axios';

export default function ProductDetailAdmin(){
    const {id} = useParams()
    const [product,setProduct]=useState({})
    const [editMode,setEditMode]=useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
        getProductById(id).then(({data})=>setProduct(data))
    },[])
    
    const handleClick = ()=>{
        if(editMode){
            const modifiedProduct = filterEmpty(editedData)
            updateProduct(id,modifiedProduct)
            .then(setEditMode(!editMode))
            .then(navigate(`/dashboardAdmin/products_control/`))
            .catch(error=>console.log(error))
        }else{
            setEditMode(!editMode)
        }
    }
        
    const [editedData,setEditedData]=useState({
        name: '' ,
        stock: '',
        price: '',
        discount: '' 
    })
    const handleChange = (e)=>{
        e.preventDefault()
        const property = e.target.name
        const value = e.target.value
        console.log({...editedData,[property]:value})
        setEditedData({...editedData,[property]:value})
    }

    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <IconButton onClick={handleClick} >
                    {!editMode?<EditIcon style={{fill:paleta.accent1}} />:<CheckIcon style={{fill:paleta.accent1}} />}
                </IconButton>
                    <div className={styles.titulo}>
                        <h1>Product #{product.id}</h1>
                        {editMode?<input type='text' placeholder={product.name} name='name' value={editedData.name} onChange={(e)=>handleChange(e)}/>: <h3>{product.name}</h3>}
                    </div>
                <div className={styles.important}>
                    <div className={styles.dataImportante}>
                        <h1>Stock</h1>
                        {editMode?<input type='text' placeholder={product.stock} name='stock' value={editedData.stock} onChange={(e)=>handleChange(e)}/>: <h3 style={product.stock<10 ? {color:'red'}:{color:'green'}}>{product.stock}</h3>}
                    </div>
                    <div className={styles.dataImportante}>
                        <h1>Price</h1>
                        {editMode?<input type='text' placeholder={product.price} name='price' value={editedData.price} onChange={(e)=>handleChange(e)}/>: <h3>${product.price}</h3>}
                    </div> 
                </div>
                <div className={styles.otro}>
                    <div className={styles.otraData}>
                        <h1>Discount</h1>
                        {   editMode?<input type='text' placeholder={product.discount?`${product.discount}%`:'none'} name='discount' value={editedData.discount} onChange={(e)=>handleChange(e)}/>: <h3>{product.discount?`${product.discount}%`:'none'}</h3>}
                    </div>
                    <div className={styles.otraData}>
                        <h1>Rate</h1>
                        <h3>{product && product.rate && product.rate.toFixed(2)}</h3>
                    </div>
                </div>
                <h1>Gallery:</h1>
                {
                    product.image
                    ?<img style={{width:'10rem'}} src={product.image} alt={product.name} />
                    :<Skeleton width={'10rem'}/>
                }
            </div>
        </div>
    )
}