import FormCreateProfessional from '../../components/FormCreateProfessional/FormCreateProfessional'
import styles from './NewProfessional.module.css'

export default function NewProfessional(){
    return(
        <div className={styles.container}>
            <FormCreateProfessional/>
        </div>
    )
}