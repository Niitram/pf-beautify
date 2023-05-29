import ServicesTable from '../../components/servicesTable/ServicesTable'
import styles from './ServicesControl.module.css'

export default function ServicesControl (){
    return (
        <div className={styles.container}>
            <ServicesTable/>
        </div>
    )
}