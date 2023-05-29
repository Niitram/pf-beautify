import ButtonNav from '../buttons/buttonNav/ButtonNav'
import styles from './NavAdmin.module.css'

export default function NavAdmin(){
    return(
        <div className={styles.container}>
            <div className={styles.botones}>
                <ButtonNav text={"Clients"} route="/dashboardAdmin/clients"></ButtonNav>
                <ButtonNav text={"Appointments"} route={'/dashboardAdmin/appointments'}></ButtonNav>
                <ButtonNav text={"Services"} route={"/dashboardAdmin/services_control"}></ButtonNav>
                <ButtonNav text={"Professionals"} route={"/dashboardAdmin/professionals"}></ButtonNav>
                <ButtonNav text={"Products"} route={"/dashboardAdmin/products_control   "}></ButtonNav>
             </div>
        </div>
    )
    }