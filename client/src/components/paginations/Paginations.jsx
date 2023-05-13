import { useSelector } from "react-redux";
import productsForPage from "../../utils/productsForPage";
import ShowCardsProduct from "../showCardsProduct/ShowCardsProduct";
import styles from "./Paginations.module.css";

function Paginations({ currentPage, setCurrentPage }) {
  const copyAllProducts = useSelector((state) => state.copyAllProducts);

  const arrayWithPages = productsForPage(copyAllProducts);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className={styles.Container}>
      <div>
        <button
          className={styles.buttonPages}
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          Prev
        </button>
        {arrayWithPages.map((page, index) => {
          if (arrayWithPages.length - 1) {
            return (
              <button
                className={styles.buttonPages}
                disabled={currentPage === index + 1}
                key={index}
                onClick={() => {
                  <ShowCardsProduct currentPage={setCurrentPage(index + 1)} />;
                }}
              >
                {index + 1}
              </button>
            );
          }
        })}
        <button
          className={styles.buttonPages}
          disabled={
            currentPage === arrayWithPages.length || arrayWithPages.length === 1
          }
          onClick={nextPage}
        >
          Next 
        </button>
      </div>
      <div className={styles.containerShowCards}>
        <ShowCardsProduct currentPage={currentPage} />
      </div>
    </div>
  );
}

export default Paginations;
