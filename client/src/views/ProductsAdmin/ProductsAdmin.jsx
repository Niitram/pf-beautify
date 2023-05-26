import ProductsTable from '../../components/ProductsTable/ProductsTable'
import styles from './ProductsAdmin.module.css'

export default function ProductsAdmin(){
    return(
        <div className={styles.container}>
            <ProductsTable/>
        </div>
    )
}