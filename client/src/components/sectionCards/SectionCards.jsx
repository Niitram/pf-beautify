import Card from "../card/Card";
import getTopRatedProducts from "../../utils/getTopRatedProducts";
import styles from "./sectionCards.module.css";
import { Divider } from "@mui/material";
import getProductsCategorie from "../../utils/getProductsCategorie";

function SectionCards({
  nameSection,
  arrayProducts,
  isCategory = false,
  populars = false,
  category = "",
}) {
  let arrayShowProduct = [];
  if (isCategory) {
    const productsCategorie = getProductsCategorie(arrayProducts, category);
    arrayShowProduct = getTopRatedProducts(productsCategorie);
  }
  if (populars) arrayShowProduct = getTopRatedProducts(arrayProducts);

  return (
    <section className={styles.sectionCards}>
      <Divider textAlign="left" className={styles.divider}>
        {nameSection}
      </Divider>
      <div className={styles.containerCards}>
        {arrayShowProduct?.map((product) => {
          return (
            <div key={product.id} className={styles.containerCard}>
              <Card
                image={product.image}
                name={product.name}
                price={product.price}
                rate={product.rate}
                id={product.id}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SectionCards;
