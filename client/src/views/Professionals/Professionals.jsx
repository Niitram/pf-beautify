import ProfessionalsTable from '../../components/ProfessionalsTable/ProfessionalsTable'
import styles from './Professionals.module.css'

export default function Professionals(){
    return(
        <div className={styles.container}>
            <ProfessionalsTable/>
        </div>
    )
}