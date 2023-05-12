import Card from "../card/Card";
import { useSelector } from "react-redux";
import styles from "./ShowCardsProduct.module.css";

function ShowCardsProduct({ currentPage }) {
  const copyAllProducts = useSelector((state) => state.copyAllProducts);
  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 7;
  const pageProduct = copyAllProducts.slice(startIndex, endIndex + 1);
  return (
    <section className={styles.container}>
      {pageProduct.map((product) => {
        return (
          <Card
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            rate={product.rate}
            id={product.id}
          />
        );
      })}
    </section>
  );
}

export default ShowCardsProduct;
