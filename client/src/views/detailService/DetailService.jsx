import { useParams } from "react-router-dom";
import { getServiceById } from "../../request/services";
import { useEffect, useState } from "react";
import Reviews from "../../components/reviews/Reviews";
import { getProfessionalById } from "../../request/professionals";
import CardProfessional from "../../components/cardProfessional/CardProfessional";
import styles from "./DetailService.module.css";
import { Rating, Skeleton, Stack } from "@mui/material";

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
    } catch (error) {
      console.log(error.message);
    }

    return () => {
      setService({});
    };
  }, []);
  return (
    <section className={styles.container}>
      <h1>Service</h1>
      {service && (
        <div className={styles.containerDetail}>
          <img
            className={styles.image}
            src={service.image}
            alt={service.name}
          />
          <div className={styles.containerInfo}>
            <h2>{service.name}</h2>
            <p className={styles.description}>{service.description}</p>
            <div>
              <h3>Duration</h3>
              <span>{service.duration}</span>
            </div>
            <div>
              <h3>Price</h3>
              <span>${service.price}</span>
            </div>
            <div>
              <h3 className={styles.rating}>Rating</h3>
              {service.rate ? (
                <Stack>
                  <Rating
                    value={service.rate < 1 ? 1 : service.rate}
                    precision={0.5}
                    readOnly
                  />
                </Stack>
              ) : (
                <Skeleton variant="rectangular" width={150} />
              )}
            </div>
          </div>
        </div>
      )}
      <h3>Professional</h3>
      <CardProfessional professional={professional} />
      <Reviews comments={service.Comments} rate={service.rate} />
    </section>
  );
}

export default DetailService;
