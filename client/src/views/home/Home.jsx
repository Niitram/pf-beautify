import axios from "axios";
import { useEffect, useState } from "react";
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import 'react-multi-carousel/lib/styles.css';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PromoCard from "../../components/promo card/PromoCard";
import styles from "./Home.module.css";
<<<<<<< HEAD
// import Rating from "@mui/material/Rating";

function Home() {
  /*  const [value, setValue] = useState(3); */
  return <div className={styles.home}>home</div>;
=======

function Home() {
  const [products, setProducts] = useState([]);

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then(({ data }) => setProducts(data));
  }, []);
  console.log(products);

  const handleNext = () => {
    current < products.length - 1
      ? setCurrent((prevState) => prevState + 1)
      : setCurrent(0);
    console.log(current);
  };
  const handlePrev = () => {
    current === 0
      ? setCurrent(products.length - 1)
      : setCurrent((prevState) => prevState - 1);
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>Welcome to our shop</h1>
      <span className={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quae
        laudantium aliquam ducimus atque impedit doloribus. Voluptatibus aliquid
        modi amet quasi reiciendis rem dolorum! Iste consectetur delectus
        dignissimos explicabo facilis.
      </span>
      <div>
        {products.length ? (
          <div className={styles.Promos}>
            {/* <img src={current==0?products[products.length-1].image:products[current-1]} alt='bla'/> */}
            <button className={styles.Next} onClick={handlePrev}>
              <ArrowBackIosNewIcon />
            </button>
            <PromoCard
              image={products[current].image}
              id={products[current].id}
              name={products[current].name}
            />
            <button className={styles.Next} onClick={handleNext}>
              <ArrowForwardIosIcon />
            </button>
            {/* <img src={current==products.length? products[0].image:products[current+1].image} alt='bla'/> */}
          </div>
        ) : (
          <div>waiting...</div>
        )}
      </div>
      <span className={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quae
        laudantium aliquam ducimus atque impedit doloribus. Voluptatibus aliquid
        modi amet quasi reiciendis rem dolorum! Iste consectetur delectus
        dignissimos explicabo facilis.
      </span>
    </div>
  );
>>>>>>> fc1a625d43c64e9833c7aa65e1e4f69ab6a2330f
}

export default Home;
