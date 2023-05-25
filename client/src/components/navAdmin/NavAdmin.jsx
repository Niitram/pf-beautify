import ButtonNav from '../buttons/buttonNav/ButtonNav'
import styles from './NavAdmin.module.css'

export default function NavAdmin(){
    return(
        <div className={styles.container}>
            <div className={styles.botones}>
                <ButtonNav text={"Clients"} route="/clients"></ButtonNav>
                <ButtonNav text={"Appointments"} route={'/appointments'}></ButtonNav>
                <ButtonNav text={"Services"} route={"/services_control"}></ButtonNav>
                <ButtonNav text={"Professionals"} route={"/professionals"}></ButtonNav>
             </div>
        </div>
    )
    }