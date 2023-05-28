import { Rating, Skeleton, Stack } from "@mui/material";
import styles from "./Reviews.module.css";
import Divider from "@mui/material/Divider";
import getTopRatedProducts from "../../utils/getTopRatedProducts";

function Reviews({ rate, comments }) {
  let califications = [];
  if (comments && comments.length > 0) {
    califications = getTopRatedProducts(comments);
  }
  console.log(califications);
  return (
    <section className={styles.section}>
      <Divider sx={{ marginBottom: "50px", marginTop: "50px" }}></Divider>
      <h3 className={styles.h3}>Customer reviews</h3>
      <div className={styles.containerRateComents}>
        <div className={styles.containerRateTitle}>
          <div className={styles.rateContainer}>
            {rate && (
              <div className={styles.rateNumber}>{Number(rate).toFixed(1)}</div>
            )}
            <div>
              {rate ? (
                <Stack>
                  <Rating
                    value={Number(rate) < 1 ? 1 : Number(rate)}
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
            {califications &&
              califications.length > 0 &&
              califications.map((calification, index) => {
                return (
                  <div key={index}>
                    <span> {calification.tittle} </span>
                    <Stack>
                      <Rating
                        value={
                          Number(calification.rating) < 1
                            ? 1
                            : Number(calification.rating)
                        }
                        precision={0.5}
                        readOnly
                      />
                    </Stack>
                  </div>
                );
              })}
            {califications && califications.length === 0 && <p>no reviews</p>}
          </div>
        </div>
        <Divider variant="middle" orientation="vertical" flexItem></Divider>
        <div className={styles.comentsContainer}>
          {comments &&
            comments.length > 0 &&
            comments.map((comment, index) => {
              return (
                <div key={index}>
                  <div className={styles.containerRateDate}>
                    {comment.rating ? (
                      <Stack>
                        <Rating
                          value={
                            Number(comment.rating) < 1
                              ? 1
                              : Number(comment.rating)
                          }
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                    ) : (
                      <Skeleton width={100} height={20} />
                    )}
                    <span className={styles.date}>{comment.date}</span>
                  </div>
                  {comment.fullName && (
                    <span className={styles.name}>{comment.fullName}</span>
                  )}
                  {comment.client && (
                    <span className={styles.name}>{comment.client}</span>
                  )}
                  <p className={styles.description}>{comment.content}</p>
                </div>
              );
            })}
          {comments && comments.length === 0 && (
            <p>We still do not have any reviews</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
