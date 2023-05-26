import Calendar from "../../components/calendar/Calendar";
import styles from "./Services.module.css";
import imgLogo from "../../assets/images/logo-beautify-1063x1063.png";
import { Divider } from "@mui/material";

function Services() {
  return (
    <section className={styles.section}>
      <div className={styles.carrusel}></div>
      <div className={styles.containerButtons}>
        <button className={styles.buttonDiscover}>Discover our services</button>
        <button className={styles.buttonReserveNow}>Reserve now</button>
      </div>

      <h3 className={styles.titleH3}>Our services</h3>
      <Divider sx={{ mt: 5 }} />
      <div className={styles.imageFixed}>
        <img className={styles.image} src={imgLogo} alt="Logo Beautify" />
      </div>
      <Divider sx={{ mb: 5 }} />
      <h3 className={styles.titleH3}>Make your reservation</h3>
      <Calendar />
    </section>
  );
}

export default Services;
