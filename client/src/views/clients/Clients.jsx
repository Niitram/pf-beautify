import ClientsTable from '../../components/ClientsTable/ClientsTable'
import styles from './Clients.module.css'

export default function Clients (){
    return(
        <div className={styles.container}>
            <ClientsTable></ClientsTable>
        </div>
    )
}