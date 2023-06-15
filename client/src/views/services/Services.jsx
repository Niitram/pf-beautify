import Calendar from "../../components/calendar/Calendar";
import styles from "./Services.module.css";
import imgLogo from "../../assets/images/logo-beautify-1063x1063.png";
import { Divider, Skeleton } from "@mui/material";
import { getServices } from "../../request/services";
import { useEffect, useRef, useState } from "react";
import CardService from "../../components/cardService/CardService";
import { getAllProfessionals } from "../../request/professionals";
import { useDispatch, useSelector } from "react-redux";
import { addAllProfessionals } from "../../redux/actions";
import CardProfessional from "../../components/cardProfessional/CardProfessional";

function Services({ handleLoginClick }) {
  const [allServices, setAllServices] = useState();
  const AllProfessionals = useSelector((state) => state.allProfessionals);
  const dispatch = useDispatch();
  const calendarioRef = useRef(null);
  const servicesRef = useRef(null);

  const scrollToCalendario = () => {
    if (calendarioRef.current) {
      calendarioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  //Se traen los servicios y los profesionales
  useEffect(() => {
    try {
      getAllProfessionals().then((response) => {
        dispatch(addAllProfessionals(response.data));
      });
      getServices().then((response) => {
        setAllServices(response.data);
      });
    } catch (error) {
      console.log(error.message);
    }
    return () => {};
  }, []);
  return (
    <section className={styles.section}>
      <div className={styles.carrusel}></div>
      <div className={styles.containerButtons}>
        <button onClick={scrollToServices} className={styles.buttonDiscover}>
          Discover our services
        </button>
        <button
          onClick={scrollToCalendario}
          className={styles.buttonReserveNow}
        >
          Reserve now
        </button>
      </div>
      <h3 className={styles.titleH3}>Our services</h3>
      <div ref={servicesRef} className={styles.containerCards}>
        {allServices &&
          allServices.map((service) => {
            return <CardService key={service.id} service={service} />;
          })}
      </div>

      <Divider sx={{ mt: 5 }} />
      <div className={styles.imageFixed}>
        <img className={styles.image} src={imgLogo} alt="Logo Beautify" />
      </div>
      <Divider sx={{ mb: 5 }} />
      <h3 ref={calendarioRef} className={styles.titleH3}>
        Make your reservation
      </h3>
      <Calendar handleLoginClick={handleLoginClick} />
      <Divider sx={{ mt: 5 }} />
      <h3 className={styles.titleH3}>Our professionals</h3>
      {AllProfessionals && AllProfessionals.length > 0 ? (
        <div className={styles.containerCards}>
          {AllProfessionals &&
            AllProfessionals.length > 0 &&
            AllProfessionals.map((professional) => {
              return (
                <CardProfessional
                  key={professional.id}
                  professional={professional}
                />
              );
            })}
        </div>
      ) : (
        <Skeleton variant="rectangular" width={300} height={300} />
      )}
    </section>
  );
}

export default Services;
