import axios from "axios";
import { useEffect, useState } from "react";

import PromoCard from "../../components/promo card/PromoCard";
import styles from "./Home.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/products")
        .then(({ data }) => setProducts(data));
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>Welcome to our shop</h1>
      <div>
        {products.length ? (
          <Splide
            aria-label="My Favorite Images"
            options={{
              type: "loop",
              fixedWidth: "50vw",
              fixedHeight: "50vw",
              perPage: 3,
              focus: "center",
              gap: "1rem",
              arrows: true,
              arrowPath: "",
              pagination: true,
              // lazyLoad:'nearby',
              classes: {
                arrows: "splide__arrows customArrows",
                arrow: "splide__arrow customArrow",
                prev: "splide__arrow--prev customPrevArrow",
                next: "splide__arrow--next customNextArrow",
              },
            }}
          >
            {products.map((elem, index) => (
              <SplideSlide className={styles.splideSlide} key={index}>
                <PromoCard image={elem.image} id={elem.id} name={elem.name} />
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <div>waiting...</div>
        )}
      </div>
      <footer className={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quae
        laudantium aliquam ducimus atque impedit doloribus. Voluptatibus aliquid
        modi amet quasi reiciendis rem dolorum! Iste consectetur delectus
        dignissimos explicabo facilis.
      </footer>
    </div>
  );
}

export default Home;
