import { useParams } from "react-router-dom";
import { getServiceById } from "../../request/services";
import { useEffect, useState } from "react";
import Reviews from "../../components/reviews/Reviews";
import { getProfessionalById } from "../../request/professionals";
import CardProfessional from "../../components/cardProfessional/CardProfessional";
import styles from "./DetailService.module.css";

function DetailService() {
  const [service, setService] = useState({});
  const [professional, setProfessional] = useState({});
  const { id } = useParams();

  useEffect(() => {
    try {
      getServiceById(id).then((res) => {
        setService(res.data);
        getProfessionalById(res.data.ProfesionalId).then((res) => {
          setProfessional(res.data);
        });
      });
      /* getProfessionalById(3).then((res) => {
        setProfessional(res.data);
        console.log(res.data);
      }); */
    } catch (error) {
      console.log(error.message);
    }

    return () => {
      setService({});
    };
  }, []);
  return (
    <section className={styles.container}>
      {service && (
        <div>
          <h1>{service.name}</h1>
          <p>{service.description}</p>
          <span>Price: {service.price}</span>
          <span>Duration: {service.duration}</span>
          <span>Rating: {service.rate}</span>
          <img src={service.image} alt={service.name} />
        </div>
      )}
      <CardProfessional service={service} professional={professional} />
      <Reviews rate={service.rate} />
    </section>
  );
}

export default DetailService;
