
import logo from '../../assets/images/logo-beautify-500x500.png';
import Button from '../buttons/buttonNav/ButtonNav'
import styles from './NavAdmin.module.css'

export const NavAdmin = () => {
    return(
<nav  className={styles.container_dashadmin} >
<div  className={styles.container_logo}>
    <figure className={styles.container_img} >
        <img  className={styles.img_logo} src={logo} alt="logo de beautify" />
    </figure>
</div>
<div className={styles.container_btn} >
<Button className={styles.btnNav}  text={"Clientes"} route ={"#"} />
<Button  className={styles.btnNav} text={"Reservas"} route ={"#"} />
<Button className={styles.btnNav}  text={"Servicios"} route ={"#"} />
<Button className={styles.btnNav}  text={"Productos"} route ={"#"} />
</div>

</nav>
    )
}