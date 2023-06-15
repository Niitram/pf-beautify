import styles from './sales.module.css'
import SalesTable from '../../components/salesTable/salesTable'

export default function Sales(){
    return(
        <div className={styles.container}>
            <SalesTable/>
        </div>
    )
}