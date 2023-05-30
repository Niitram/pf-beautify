import { IconButton } from '@mui/material'
import ProductsTable from '../../components/ProductsTable/ProductsTable'
import styles from './ProductsAdmin.module.css'
import AddIcon from '@mui/icons-material/Add';
import paleta from '../../assets/images/Paleta'
import { useNavigate } from 'react-router-dom';

export default function ProductsAdmin(){

    const navigate = useNavigate()

    return(
        <div className={styles.container}>
            <ProductsTable/>
            <div className={styles.aux} onClick={()=>navigate('/dashboardAdmin/newProduct')}>
                <IconButton
                    className={styles.iconButton}
                >
                    <div></div>
                    <AddIcon className={styles.plus} style={{fill:paleta.background,scale:'400%'}}/>
                </IconButton>
            </div>
        </div>
    )
}