import { Rating, Skeleton, Stack } from "@mui/material";
import styles from "./Reviews.module.css";
import Divider from "@mui/material/Divider";

const calificaciones = [
  {
    title: "Excelent product",
    rate: 5,
  },
  {
    title: "Maomeno",
    rate: 3,
  },
  {
    title: "Buena calidad",
    rate: 4.5,
  },
  {
    title: "Algo mas",
    rate: 2,
  },
];
const coments = [
  {
    fullName: "Juan Perez",
    title: "Excelent product",
    description:
      "lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.rem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    date: "2023-05-06",
    rating: 5,
  },
  {
    fullName: "Jose Hernandez",
    title: "Maomeno",
    description:
      "lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.rem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    date: "2023-05-06",
    rating: 3,
  },
  {
    fullName: "Julieta laohg",
    title: "Buena calidad",
    description:
      "lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.rem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    date: "2023-05-06",
    rating: 4.5,
  },
  {
    fullName: "Lee assd",
    title: "Algo mas",
    description:
      "lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.rem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    date: "2023-05-06",
    rating: 2,
  },
  {
    fullName: "Gatito 3434",
    title: "asdasd asdwqd",
    description:
      "lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.rem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    date: "2023-05-06",
    rating: 3.8,
  },
];

function Reviews({ rate }) {
  return (
    <section className={styles.section}>
      <Divider sx={{ marginBottom: "50px", marginTop: "50px" }}></Divider>
      <h3 className={styles.h3}>Customer reviews</h3>
      <div className={styles.containerRateComents}>
        <div className={styles.containerRateTitle}>
          <div className={styles.rateContainer}>
            <div className={styles.rateNumber}>{rate?.toFixed(1)}</div>
            <div>
              {rate ? (
                <Stack>
                  <Rating
                    value={rate < 1 ? 1 : rate}
                    precision={0.5}
                    readOnly
                  />
                </Stack>
              ) : (
                <Skeleton width={150} height={20} />
              )}
              <span className={styles.rateText}>5 calificaciones</span>
            </div>
          </div>
          <Divider
            light={false}
            sx={{ marginBottom: "50px", marginTop: "50px" }}
          ></Divider>
          <h4 className={styles.h4}>Feature rating</h4>
          <div className={styles.comentTitleContainer}>
            {calificaciones?.map((calificacion, index) => {
              return (
                <div key={index}>
                  <span> {calificacion.title} </span>
                  <Stack>
                    <Rating
                      value={calificacion.rate < 1 ? 1 : calificacion.rate}
                      precision={0.5}
                      readOnly
                    />
                  </Stack>
                </div>
              );
            })}
          </div>
        </div>
        <Divider variant="middle" orientation="vertical" flexItem></Divider>
        <div className={styles.comentsContainer}>
          {coments?.map((coment, index) => {
            return (
              <div key={index}>
                <div className={styles.containerRateDate}>
                  {coment.rating ? (
                    <Stack>
                      <Rating
                        value={coment.rating < 1 ? 1 : coment.rating}
                        precision={0.5}
                        readOnly
                      />
                    </Stack>
                  ) : (
                    <Skeleton width={100} height={20} />
                  )}
                  <span className={styles.date}>{coment.date}</span>
                </div>
                <span className={styles.name}>{coment.fullName}</span>
                <p className={styles.description}>{coment.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
