import Calendar from "../../components/calendar/Calendar";
import styles from "./Services.module.css";
import imgLogo from "../../assets/images/logo-beautify-1063x1063.png";
import { Divider } from "@mui/material";
import { getServices } from "../../request/services";
import { useEffect, useState } from "react";
import CardService from "../../components/cardService/CardService";

function Services() {
  const [allServices, setAllServices] = useState();

  useEffect(() => {
    try {
      getServices().then((response) => {
        setAllServices(response.data);
      });
    } catch (error) {
      console.log(error.message);
    }

    return () => {};
  }, []);

  console.log(allServices);
  return (
    <section className={styles.section}>
      <div className={styles.carrusel}></div>
      <div className={styles.containerButtons}>
        <button className={styles.buttonDiscover}>Discover our services</button>
        <button className={styles.buttonReserveNow}>Reserve now</button>
      </div>
      <div className={styles.containerCards}>
        {allServices &&
          allServices.map((service) => {
            return <CardService key={service.id} service={service} />;
          })}
        {/* {allServices && (
          <CardService key={allServices[0].id} service={allServices[0]} />
        )} */}
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
