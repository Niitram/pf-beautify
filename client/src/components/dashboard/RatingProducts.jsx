import { useState, useEffect } from "react";
import styles from "./RatingProducts.module.css";
import { getTopFiveRatingProducts } from "../../request/homeDashboard";

const RatingProducts = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const topProducts = await getTopFiveRatingProducts();
        setProductos(topProducts);
      } catch (error) {
        console.error("Error al obtener los productos mejor valorados:", error);
      }
    };

    fetchTopProducts();
  }, []);

  const maxRate = 4.5;

  return (
    <div className={styles.container}>
      <div className={styles["top-rating"]}>
        <h3>Top Rating Products</h3>
      </div>
      {productos.map((producto, index) => {
        const normalizedRate = (producto.rate / maxRate) * 100;
        return (
          <div key={index} className={styles.product}>
            <div className={styles["product-image"]}>
              <img src={producto.image} alt={producto.name} />
            </div>
            <div className={styles["product-info"]}>
              <p className={styles["product-name"]}>{producto.name}</p>
            </div>
            <div className={styles["chart-container"]}>
              <svg viewBox="0 0 36 36">
                <path
                  className={styles.circle}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={styles["circle-progress"]}
                  strokeDasharray={`${normalizedRate} 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text
                  x="18"
                  y="20.35"
                  className={styles.percentage}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {producto.rate}
                </text>
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
  
};

export default RatingProducts;
