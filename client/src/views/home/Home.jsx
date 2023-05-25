import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import PromoCard from "../../components/promo card/PromoCard";
import styles from "./Home.module.css";
// import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import SectionCards from "../../components/sectionCards/SectionCards";
// import { showError } from "../../redux/actions";
// import { getProducts } from "../../request/product";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

var imagenes = [
  "client/src/assets/images/5000238.jpg",
  "client/src/assets/images/5256956.jpg",
];
function Home() {
  // const [products, setProducts] = useState([]);
  const allProducts = useSelector((state) => state.allProducts);
  // const dispatch = useDispatch();

  // const [current, setCurrent] = useState(0);
  // useEffect(() => {
  //   try {
  //     getProducts().then(({ data }) => setProducts(data));
  //   } catch (error) {
  //     dispatch(showError({ tittle: "Error", message: error.message }));
  //     console.log(error.message);
  //   }
  // }, []);

  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>Welcome to our shop</h1>
      <div className={styles.contenedorSlider}>
        <div className={styles.btnIzquierda}>
          <KeyboardDoubleArrowLeftIcon />
        </div>
        <div className={styles.sliderScreen}>
          <img className={styles.imagen} />
        </div>
        <div className={styles.btnDerecha}>
          <KeyboardDoubleArrowRightIcon />
        </div>

        {/* {products.length ? (
          <Splide
            aria-label="My Favorite Images"
            options={{
              type: "loop",
              fixedWidth: "50 vw",
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
        )} */}
      </div>
      <h2 className={styles.description}>
        Take a look at the best prices in town!
      </h2>
      {allProducts && (
        <SectionCards
          nameSection={"Most populars"}
          arrayProducts={allProducts}
          populars={true}
        />
      )}
      {allProducts && (
        <SectionCards
          nameSection={"Pencil"}
          arrayProducts={allProducts}
          category={"Pencil"}
          isCategory={true}
        />
      )}
    </div>
  );
}

export default Home;
