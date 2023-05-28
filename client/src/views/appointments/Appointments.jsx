import AppointmentsTable from '../../components/appointmentsTableAdmin/AppointmentsTableAdmin'
import styles from './Appointments.module.css'

export default function Appointments (){
    return (
        <div className={styles.container}>
            <AppointmentsTable/>
        </div>
    )
}