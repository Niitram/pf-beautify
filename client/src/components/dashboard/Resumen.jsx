
import Avatar from '@mui/material/Avatar';
import styles from "./Resumen.module.css"
import { rgbToHex } from '@mui/system';

export const Resumen = ()=>{
    const colorRgb = '#030a10';
    return(
        <section className={styles.resumen_container}>
          <div className={styles.profile_admin}>
            <div>
                <h2>Beautify Administrator</h2>
            </div>
            <figure>
            <img src="https://media.istockphoto.com/id/1257734578/es/foto/colores-de-moda-de-esmaltes-de-u%C3%B1as-varios-tonos.jpg?s=612x612&w=0&k=20&c=eDRkLSCw1jC0UwMI-MTphbEv25G7f3Ugw4yAf2MwVwI=" alt="profile" />
            </figure>
          </div>
          <div className={styles.details}>
             <div className={styles.content_details}> 
             <Avatar sx={{ bgcolor:rgbToHex(colorRgb) }}>$</Avatar>
             <div>
             <h2>1000$</h2>
             <span>Total Ventas</span>
             </div>
             
             </div>
             <div className={styles.content_details}>
             <Avatar sx={{ bgcolor: rgbToHex(colorRgb)}}>C</Avatar>
          <div>
             <h2>7</h2>
             <span>N° Clientes</span>
             </div>
             </div>
             {/* <div className={styles.content_details}>
             <Avatar sx={{ bgcolor: rgbToHex(colorRgb)}}>C</Avatar>
          <div>
             <h2>7</h2>
             <span>N° Profesionales</span>
             </div>
             </div> */}
          </div>

          <div className={styles.details}>
          <div className={styles.content_details}>
             <Avatar sx={{ bgcolor:rgbToHex(colorRgb)}}>P</Avatar>
          <div>
             <h2>173</h2>
             <span>N° Productos</span>
             </div>
             </div>
             <div className={styles.content_details}>
             <Avatar sx={{ bgcolor: rgbToHex(colorRgb) }}>S</Avatar>
          <div>
             <h2>7</h2>
             <span>N° Servicios</span>
             </div>
             </div>
             <div className={styles.content_details}>
             <Avatar sx={{ bgcolor:rgbToHex(colorRgb) }}>R</Avatar>
          <div>
             <h2>0</h2>
             <span>N° Reservas</span>
             </div>
             </div>
          </div>
        </section>
    )
}